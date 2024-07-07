const { tebakkata } = require("@bochilteam/scraper");

class HangmanGame {
  constructor(id) {
    this.sessionId = id;
    this.guesses = [];
    this.maxAttempts = 0;
    this.currentStage = 0;
  }

  getRandomQuest = async () => {
    try {
      const { jawaban, soal } = await tebakkata();
      return { clue: soal, quest: jawaban.toLowerCase() };
    } catch (error) {
      console.error("Error fetching random quest:", error);
      throw new Error("Failed to fetch a random quest.");
    }
  };

  initializeGame = async () => {
    try {
      this.quest = await this.getRandomQuest();
      this.maxAttempts = this.quest.quest.length;
    } catch (error) {
      console.error("Error initializing game:", error);
      throw new Error("Failed to initialize the game.");
    }
  };

  displayBoard = () => {
    const emojiStages = ["😐", "😕", "😟", "😧", "😢", "😨", "😵"];
    let board = `*Current Stage:* ${emojiStages[this.currentStage]}\n\`\`\`==========\n|    |\n|   ${emojiStages[this.currentStage]}\n|   ${this.currentStage >= 3 ? "/" : ""}${this.currentStage >= 4 ? "|" : ""}${this.currentStage >= 5 ? "\\" : ""} \n|   ${this.currentStage >= 1 ? "/" : ""} ${this.currentStage >= 2 ? "\\" : ""} \n|      \n|      \n==========\`\`\`\n*Clue:* ${this.quest.clue}`;
    return board;
  };

  displayWord = () =>
    this.quest.quest
      .split("")
      .map((char) => (this.guesses.includes(char) ? `${char}` : "__"))
      .join(" ");

  makeGuess = (letter) => {
    if (!this.isAlphabet(letter)) return "invalid";
    letter = letter.toLowerCase();
    if (this.guesses.includes(letter)) return "repeat";

    this.guesses.push(letter);

    if (!this.quest.quest.includes(letter)) {
      this.currentStage = Math.min(
        this.quest.quest.length,
        this.currentStage + 1,
      );
    }

    return this.checkGameOver()
      ? "over"
      : this.checkGameWin()
        ? "win"
        : "continue";
  };

  isAlphabet = (letter) => /^[a-zA-Z]$/.test(letter);

  checkGameOver = () => this.currentStage >= this.maxAttempts;

  checkGameWin = () =>
    [...new Set(this.quest.quest)].every((char) => this.guesses.includes(char));

  getHint = () => `*Hint:* ${this.quest.quest}`;
}

const handler = async (m, { conn, usedPrefix, command, args }) => {
  conn.hangman = conn.hangman || {};
  let [action, inputs] = args;

  try {
    switch (action) {
      case "end":
        if (
          conn.hangman[m.chat] &&
          conn.hangman[m.chat].sessionId === m.sender
        ) {
          delete conn.hangman[m.chat];
          await m.reply("Successfully exit Hangman session. 👋");
        } else {
          await m.reply(
            "There is no Hangman session in progress or you are not the player.",
          );
        }
        break;

      case "start":
        if (conn.hangman[m.chat]) {
          await m.reply(
            `The Hangman session is already underway. Use ${usedPrefix + command} *end* to end the session.`,
          );
        } else {
          conn.hangman[m.chat] = new HangmanGame(m.sender);
          const gameSession = conn.hangman[m.chat];
          await gameSession.initializeGame();
          await m.reply(
            `Hangman session begins. 🎉\n\n*Session ID:* ${gameSession.sessionId}\n${gameSession.displayBoard()}\n\n*Guess the Word:*\n${gameSession.displayWord()}\n\nSend letter to guess, example: *${usedPrefix + command} guess a*`,
          );
        }
        break;

      case "guess":
        if (conn.hangman[m.chat]) {
          if (!inputs || !/^[a-zA-Z]$/.test(inputs)) {
            await m.reply(
              `Enter the letter you want to guess after *guess*. Example: *${usedPrefix + command} guess a*`,
            );
            return;
          }

          const gameSession = conn.hangman[m.chat];
          const userGuess = inputs.toLowerCase();
          const result = gameSession.makeGuess(userGuess);

          const messages = {
            invalid: "Enter a valid letter.",
            repeat: "You have guessed this letter before. Try another letter.",
            continue: `*Guessed Letters:*\n${gameSession.guesses.join(", ")}\n${gameSession.displayBoard()}\n\n*Guessed Words:*\n${gameSession.displayWord()}\n\n*Attempts Left:* ${gameSession.maxAttempts - gameSession.currentStage}`,
            over: `Game Over! You lose. The correct word is *${gameSession.quest.quest}*. 💀`,
            win: "Congratulations! You win in the Hangman game. 🎉",
          };

          await m.reply(messages[result]);

          if (result === "over" || result === "win") {
            delete conn.hangman[m.chat];
          }
        } else {
          await m.reply(
            "There are no Hangman sessions in progress. Use *start* to start the session.",
          );
        }
        break;

      case "hint":
        if (conn.hangman[m.chat]) {
          const gameSession = conn.hangman[m.chat];
          await m.reply(gameSession.getHint());
        } else {
          await m.reply(
            "There are no Hangman sessions in progress. Use *start* to start the session.",
          );
        }
        break;

      case "help":
        await m.reply(
          `*[ HANGMAN GAME ]* 🎮\n\n*Commands:*\n- *${usedPrefix + command} start :* Starts the Hangman game.\n- *${usedPrefix + command} end :* Exits the game session.\n- *${usedPrefix + command} guess [letter] :* Guess the letter in a word.\n- *${usedPrefix + command} hint :* Get a word clue.`,
        );
        break;

      default:
        await m.reply(
          `Invalid action. Use ${usedPrefix + command} *help* to see how to use the command.`,
        );
    }
  } catch (error) {
    console.error("Error in hangman handler:", error);
    await m.reply(
      "An error occurred in handling the Hangman game. Please try again.",
    );
  }
};

handler.help = ["hangman"];
handler.tags = ["game"];
handler.command = ["hangman"];
handler.group = true;
handler.limit = true;

module.exports = handler;
