const fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} beutifull girl`, m)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://itzpire.site/ai/emi?prompt=${text}`)
let hasil = await res.json()
await conn.sendFile(m.chat, hasil.result, '', '', m)
}
handler.tags = ['ai']
handler.help = ['emi *<text>*']
handler.command = ['emi']
module.exports = handler