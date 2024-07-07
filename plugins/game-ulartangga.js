const Jimp = require("jimp");

class SnakeAndLadderGame {
  constructor(sMsg) {
    this.sendMsg = sMsg;
    this.players = [];
    this.boardSize = 100;
    this.snakesAndLadders = [
      {
        start: 29,
        end: 7,
      },
      {
        start: 24,
        end: 12,
      },
      {
        start: 15,
        end: 37,
      },
      {
        start: 23,
        end: 41,
      },
      {
        start: 72,
        end: 36,
      },
      {
        start: 49,
        end: 86,
      },
      {
        start: 90,
        end: 56,
      },
      {
        start: 75,
        end: 64,
      },
      {
        start: 74,
        end: 95,
      },
      {
        start: 91,
        end: 72,
      },
      {
        start: 97,
        end: 78,
      },
    ];
    this.currentPositions = {};
    this.currentPlayerIndex = 0;
    this.bgImageUrl =
      "https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg";
    this.playerImageUrls = {
      red: "https://telegra.ph/file/86fd8ea9311e2bc99ae63.jpg",
      green:
        "https://dkonten.com/studio/wp-content/uploads/sites/19/2023/05/search-1.png",
    };
    this.bgImage = null;
    this.playerImages = {
      red: null,
      green: null,
    };
    this.cellWidth = 40;
    this.cellHeight = 40;
    this.keyId = null;
    this.started = false;
  }

  initializeGame() {
    this.players.forEach((player) => (this.currentPositions[player] = 1));
    this.currentPlayerIndex = 0;
    this.started = true;
  }

  rollDice = (num) => {
    return Array.from({ length: num }, () => Math.floor(Math.random() * 6) + 1)[
      Math.floor(Math.random() * num)
    ];
  };

  fetchImage = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      return await Jimp.read(Buffer.from(response.data, "binary"));
    } catch (error) {
      console.error(`Error fetching image from ${url}:`, error);
      throw error;
    }
  };

  getBoardBuffer = async () => {
    const board = new Jimp(420, 420);
    this.bgImage.resize(420, 420);
    board.composite(this.bgImage, 0, 0);

    for (const player of this.players) {
      const { x, y } = this.calculatePlayerPosition(player);
      board.composite(await this.getPlayerImage(player), x, y);
    }

    return board.getBufferAsync(Jimp.MIME_PNG);
  };

  calculatePlayerPosition = (player) => {
    const playerPosition = this.currentPositions[player];
    const row = 9 - Math.floor((playerPosition - 1) / 10);
    const col = (playerPosition - 1) % 10;
    const x = col * this.cellWidth + 10;
    const y = row * this.cellHeight + 10;
    return {
      x,
      y,
    };
  };

  getPlayerImage = async (player) => {
    const color = this.getPlayerColor(player);

    if (!this.playerImages[color]) {
      try {
        const image = await this.fetchImage(this.playerImageUrls[color]);
        this.playerImages[color] = image;
      } catch (error) {
        console.error(`Error fetching image for ${color} player:`, error);
        throw error;
      }
    }

    return this.playerImages[color]
      .clone()
      .resize(this.cellWidth, this.cellHeight);
  };

  getPlayerColor = (player) => (player === this.players[0] ? "red" : "green");

  startGame = async (m, player1Name, player2Name) => {
    await m.reply(
      `🐍🎲 *Selamat datang di Permainan Ular Tangga!* 🎲🐍 \n\n${this.formatPlayerName(player1Name)} *vs* ${this.formatPlayerName(player2Name)}`,
      null,
      {
        mentions: [player1Name, player2Name],
      },
    );

    this.players = [player1Name, player2Name];
    await this.initializeGame();

    if (!this.bgImage) this.bgImage = await this.fetchImage(this.bgImageUrl);

    const { key } = await conn.sendMessage(m.chat, {
      image: await this.getBoardBuffer(),
    });
    this.keyId = key;
  };

  formatPlayerName = (player) => {
    const color = this.getPlayerColor(player);
    return `@${player.split("@")[0]} ( ${color.charAt(0).toUpperCase() + color.slice(1)} )`;
  };

  playTurn = async (m, player) => {
    if (!this.players.length)
      return m.reply(
        '🛑 *Tidak ada permainan aktif.*\nGunakan "!snake start" untuk memulai permainan baru.',
      );
    if (player !== this.players[this.currentPlayerIndex])
      return m.reply(
        `🕒 *Bukan giliranmu.* \n\nSekarang giliran ${this.formatPlayerName(this.players[this.currentPlayerIndex])}`,
      );

    const diceRoll = this.rollDice(6);
    await m.reply(
      `🎲 ${this.formatPlayerName(player)} *melempar dadu.*\n\n  - Dadu: *${diceRoll}*\n  - Dari kotak: *${this.currentPositions[player]}*\n  - Ke kotak: *${this.currentPositions[player] + diceRoll}*`,
    );

    if (this.players.length === 0) return;

    const currentPosition = this.currentPositions[player];
    let newPosition = currentPosition + diceRoll;

    for (const otherPlayer of this.players) {
      if (
        otherPlayer !== player &&
        this.currentPositions[otherPlayer] === newPosition
      ) {
        const message = `😱 *Oh tidak!* ${this.formatPlayerName(player)} *menginjak posisi* ${this.formatPlayerName(otherPlayer)}\n*Kembali ke awal cell.*`;
        await m.reply(message);
        newPosition = 1;
      }
    }

    if (newPosition <= this.boardSize) {
      const checkSnakeOrLadder = this.snakesAndLadders.find(
        (s) => s.start === this.currentPositions[player],
      );

      if (checkSnakeOrLadder) {
        const action =
          checkSnakeOrLadder.end < checkSnakeOrLadder.start ? "Mundur" : "Maju";
        await m.reply(
          `🐍 ${this.formatPlayerName(player)} menemukan *${action === "Mundur" ? "ular" : "tangga"}!*\n*${action}* ke kotak *${checkSnakeOrLadder.end}*`,
        );
        this.currentPositions[player] = checkSnakeOrLadder.end;
      } else {
        this.currentPositions[player] = newPosition;
      }

      if (this.currentPositions[player] === this.boardSize) {
        await m.reply(
          `🎉 ${this.formatPlayerName(player)} menang!\n*Selamat!*`,
          null,
          {
            mentions: [player],
          },
        );
        await this.resetSession();
        return;
      }

      if (diceRoll !== 6) {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      } else {
        await m.reply(
          "🎲 *Anda mendapat 6*\nJadi giliran Anda masih berlanjut.",
          null,
          {
            mentions: this.players,
          },
        );
      }
    } else {
      await m.reply(
        "🔄 Melebihi batas kotak, posisi direset dan giliran beralih ke pemain berikutnya.",
        null,
        {
          mentions: this.players,
        },
      );
      this.currentPositions[player] = 1;
      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    await conn.sendMessage(m.chat, {
      delete: this.keyId,
    });

    const { key } = await conn.sendMessage(m.chat, {
      image: await this.getBoardBuffer(),
    });
    this.keyId = key;
  };

  addPlayer = (player) =>
    this.players.length < 2 &&
    !this.players.includes(player) &&
    player !== "" &&
    (this.players.push(player), true);

  resetSession = () => {
    this.players = [];
    this.currentPositions = {};
    this.currentPlayerIndex = 0;
    this.started = false;
  };

  isGameStarted = () => this.started;
}

class GameSession {
  constructor(id, sMsg) {
    this.id = id;
    this.players = [];
    this.game = new SnakeAndLadderGame(sMsg);
  }
}

const handler = async (m, { args, usedPrefix, command }) => {
  conn.ulartangga = conn.ulartangga || {};
  const sessions = (conn.ulartangga_ = conn.ulartangga_ || {});
  const sessionId = m.chat;
  const session =
    sessions[sessionId] ||
    (sessions[sessionId] = new GameSession(sessionId, conn));
  const game = session.game;
  const { state } = conn.ulartangga[m.chat] || {
    state: false,
  };

  switch (args[0]) {
    case "join":
      if (state)
        return m.reply("🛑 *Permainan sudah dimulai.*\nTidak dapat bergabung.");
      const playerName = m.sender;
      const joinSuccess = game.addPlayer(playerName);
      joinSuccess
        ? m.reply(
            `👋 ${game.formatPlayerName(playerName)} *bergabung ke dalam permainan.*`,
          )
        : m.reply(
            "*Anda sudah bergabung atau permainan sudah penuh.*\nTidak dapat bergabung.",
          );
      break;

    case "start":
      if (state)
        return m.reply(
          "🛑 *Permainan sudah dimulai.*\nTidak dapat memulai ulang.",
        );
      conn.ulartangga[m.chat] = {
        ...conn.ulartangga[m.chat],
        state: true,
      };
      if (game.players.length === 2) {
        await game.startGame(m, game.players[0], game.players[1]);
        await m.reply(
          "🛑 *Permainan sudah dimulai.*\nTidak dapat memulai ulang.",
        );
        return;
      } else {
        await m.reply(
          "👥 *Tidak cukup pemain untuk memulai permainan.*\nDiperlukan minimal 2 pemain.",
        );
        return;
      }
      break;

    case "roll":
      if (!state)
        return m.reply(
          `🛑 *Permainan belum dimulai.*\nKetik *${usedPrefix + command} start* untuk memulai.`,
        );
      if (game.isGameStarted()) {
        const currentPlayer = game.players[game.currentPlayerIndex];
        if (m.sender !== currentPlayer) {
          await m.reply(
            `🕒 *Bukan giliranmu.* \n\nSekarang giliran ${game.formatPlayerName(currentPlayer)}`,
          );
          return;
        } else {
          await game.playTurn(m, currentPlayer);
          return;
        }
      } else {
        await m.reply(
          `🛑 *Permainan belum dimulai.*\nKetik *${usedPrefix + command} start* untuk memulai.`,
        );
        return;
      }
      break;

    case "reset":
      conn.ulartangga[m.chat] = {
        ...conn.ulartangga[m.chat],
        state: false,
      };
      session.game.resetSession();
      delete sessions[sessionId];
      await m.reply("🔄 *Sesi permainan direset.*");
      break;

    case "help":
      await m.reply(
        `🎲🐍 *Permainan Ular Tangga* 🐍🎲\n\n*Commands:*\n- *${usedPrefix + command} join :* Bergabung ke dalam permainan.\n- *${usedPrefix + command} start :* Memulai permainan.\n- *${usedPrefix + command} roll :* Melempar dadu untuk bergerak.\n- *${usedPrefix + command} reset :* Mereset sesi permainan.`,
      );
      break;

    default:
      m.reply(
        `❓ *Perintah tidak valid.*\nGunakan *${usedPrefix + command} help* untuk melihat daftar perintah.`,
      );
  }
};

handler.help = ["ulartangga"];
handler.tags = ["rpg"];
handler.command = /^(ular(tangga)?|ladders|snak(e)?)$/i;

module.exports = handler;
