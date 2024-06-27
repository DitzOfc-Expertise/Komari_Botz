let fetch = require("node-fetch")

let handler = async (m, { command, text, args }) => {
if (!text) return m.reply('Halo Ada yang bisa ku bantu? Untuk melanjutkan, ketik .ai dengan sertakan pertanyaan mu😊')
conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
try {
const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
  const hours = date.getHours();
  const name = await conn.getName(m.sender);
  const minutes = date.getMinutes();
  const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  let content = `nama kamu Adalah MobileGPT, Sebuah program robot informatif dan serba tahu yang di ciptakan oleh DitzOfc, jawab setiap pertanyaan dengan jawaban yang informatif, dan jika ada yang bertanya tentang waktu kamu jawab yang berkaitan dengan ${timeNow} dan ${getTodayDate()}`
  let res = await fetch (`https://aemt.me/prompt/gpt?prompt=${content}&text=${text}`)
  let response = await res.json()
    let whtgpt = '27767346284@s.whatsapp.net'
    conn.sendMessage(m.chat, { text: `Powered By: @${whtgpt.split("@")[0]}\n\n${response.result}`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[whtgpt]
}}, { quoted: m })
    } catch (e) {
    console.log(e)
    m.reply('an unexpected error occurred, report it immediately to the creator if this problem persists')
    }
  }
handler.tags = ["ai"]
handler.help = ["ai", "whatgpt"]
handler.command = /^(ai|whatgpt)$/i

module.exports = handler

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}