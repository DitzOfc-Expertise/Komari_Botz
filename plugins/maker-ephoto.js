const axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} kemii`, m)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let hasil = await getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${global.lolkey}&text=${text}`)
  conn.sendFile(m.chat, hasil, '', 'Powered by : https://api.lolhuman.xyz', m)
  }

handler.help = ['fpslogo','anonymhacker','beautifulflower','birthdaycake','birthdayday','cartoongravity','galaxybat','galaxystyle','galaxywallpaper','glittergold','glossychrome','greenbush','greenneon','heartshaped','hologram3d','lighttext','logogaming','luxurygold','metallogo','multicolor3d','noeltext','puppycute','royaltext','silverplaybutton','snow3d','starsnight','textbyname','textcake','watercolor','wooden3d','writegalacy'].map(v => v + ' *<teks>*')
handler.command = /^(fpslogo|anonymhacker|beautifulflower|birthdaycake|birthdayday|cartoongravity|galaxybat|galaxystyle|galaxywallpaper|glittergold|glossychrome|greenbush|greenneon|heartshaped|hologram3d|lighttext|logogaming|luxurygold|metallogo|multicolor3d|noeltext|puppycute|royaltext|silverplaybutton|snow3d|starsnight|textbyname|textcake|watercolor|wooden3d|writegalacy)$/i
handler.tags = ['ephoto']
handler.limit = true

module.exports = handler

let getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}