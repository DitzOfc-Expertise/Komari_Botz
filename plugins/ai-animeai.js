let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command}) => {
    if (!text) {
    return m.reply(`Example: ${usedPrefix + command} Cat On the fire`)
    }
    conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
    try {
    let response = await fetch(`https://api.neoxr.eu/api/ai-anime?q=${text}&apikey=${global.neo}`)
    let res = await response.json()
    if (res.status && res.data) {
    let hasil = res.data
    await conn.sendFile(m.chat, hasil.url, 'Done', 'Done', m)
    }
    } catch (e) {
    console.log(e)
    await conn.reply(m.chat, '```Status Request :```'+' `Failed`', m)
    }
}
handler.help = ['animeai *<text>*']
handler.tags = ['ai']
handler.command = /^(animeai)$/i
handler.premium = false
module.exports = handler