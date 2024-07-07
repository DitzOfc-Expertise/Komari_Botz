let fetch = require('node-fetch')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} ditzofc`, m)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let res = `https://api.betabotz.org/api/ephoto/dragonfire?text=${text}&apikey=${global.btc}`
  conn.sendFile(m.chat, res, 'ditzofc.jpg', '```Success...\nDont forget to donate```', m, false)
}
handler.help = ['dragonfire'].map(v => v + ' *<text>*')
handler.tags = ['maker']
handler.command = /^(dragonfire)$/i
handler.register = true
handler.limit = true

module.exports = handler