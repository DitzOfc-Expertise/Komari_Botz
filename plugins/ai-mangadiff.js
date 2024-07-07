let fetch = require('node-fetch')


let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} anime`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
let api = await fetch(`https://itzpire.site/ai/mangadiff?prompt=${text}`)
let hasil = await api.json()
let gambar = hasil.result
conn.sendMessage(m.chat, { image: { url: gambar }, caption: 'Done' }, { quoted: m })
} catch (e) {
conn.reply(e)
}
};
handler.help = ["mangadiff *<text>*"]
handler.tags = ["ai"]
handler.command = ["mangadiff"]
handler.premium = false
handler.register = true

module.exports = handler
