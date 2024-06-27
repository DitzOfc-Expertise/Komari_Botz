const axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {  
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Hello Sir`, m)
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let a = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/ja?apikey=${global.lolkey}&text=${text}`)
  let js = await a.data
  const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": js.result.translated,
    "voice": "jp_003"
})
conn.sendMessage(m.chat, { audio: Buffer.from(data.data, "base64"), mimetype: "audio/mp4" }, {quoted: m})
}

handler.help = ['voicevox *<text>*']
handler.tags = ['ai', 'internet']
handler.command = /^(voicevox)$/i
handler.limit = true

module.exports = handler