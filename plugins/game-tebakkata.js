const fetch = require('node-fetch');

let timeout = 120000;
let poin = 1500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
    let id = m.chat;

    console.log(`Starting a new game.`); // Logging untuk memulai game baru

    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')).json();
    let json = src[Math.floor(Math.random() * src.length)];
    let caption = `${json.soal}
    
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teka untuk bantuan
Bonus: ${poin} XP

*Note : Reply Pesan Ini Jika Ingin Menjawab Soal*
`.trim();
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkata[id][0]);
                delete conn.tebakkata[id];
            }
        }, timeout)
    ];
};

handler.help = ['tebakkata'];
handler.tags = ['game'];
handler.command = /^tebakkata/i;
handler.limit = true;
handler.group = false;
handler.exp = 0;

module.exports = handler;