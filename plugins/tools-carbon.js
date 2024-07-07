let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .carbon require("DitzOfc")', m)
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
let car = await (await fetch(`https://itzpire.com/maker/carbon?code=${text}`)).json()
    let bon = car.result
    conn.sendMessage(m.chat,{image:{url: bon}, caption: 'Done'},{quoted: m})
}
handler.help = ['carbon'].map(v => v + ' *<text>*')
handler.tags = ['maker']
handler.command = /^(carbon)$/i

module.exports = handler