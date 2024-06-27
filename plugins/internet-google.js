let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, text}) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .google Bot Whatsapp', m)
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet}) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
    let ss = `https://api.apiflash.com/v1/urltoimage?access_key=80145ab3eded44bdb0dbb14ee209f3b8&wait_until=page_loaded&url=${url}`
    await conn.sendFile(m.chat, ss, 'screenshot.png', msg, m)
}
handler.help = ['google'].map(v => v + ' *<text>*')
handler.tags = ['internet']
handler.command = /^google?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler