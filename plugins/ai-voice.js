let fetch = require('node-fetch');
let axios = require('axios');
let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* .ai-voice Siapa presiden Indonesia?`, m)
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
await conn.sendPresenceUpdate('recording', m.chat);

  const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = await conn.getName(m.sender);
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    let chat = await Lbbai(
      m.text,
      `kamu Adalah Tenka seorang gadis muda pendiam dan cantik, jawab setiap pertanyaan dengan jawaban yang edukatif, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name} , kamu memiliki sifat dingin dan sedikit tsundere imut, pembuat mu adalah Adit`,
    );
    let hasil = chat.answer;

  let formattedHasil = hasil.replace(/```/g, " ");
  let itu = await (
    await axios.get(
      `https://api.itsrose.life/tools/tts?text=${formattedHasil}&voice_id=elon_musk`,
      { headers: { Authorization: global.rose } },
    )
  ).data;
  conn.sendFile(m.chat, itu, 'eror.mp3', null, m, true);
};

handler.help = ['ai-voice *<text>*'];
handler.command = /^ai-voice$/i
handler.tags = ['ai'];
handler.premium = false;

module.exports = handler;

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}

async function Lbbai(sistem, input) {
  const messages = [
    { role: "system", content: input },
    { role: "user", content: sistem },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}