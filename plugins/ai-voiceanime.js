let axios = require("axios")

let handler = async (m, { text, command, usedPrefix, args }) => {
if (!text) return m.reply(`${usedPrefix + command} Halo semua!`)
conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
try {
let res = await getBuffer(`https://anabot.my.id/api/ai/voiceAnime?text=${text}&apikey=DitzOfc`)
conn.sendMessage(m.chat, { audio: res, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
} catch (e) {
console.log(e)
m.reply(e)
}
}

handler.tags = ["ai"]
handler.help = ["voicenime"]
handler.command = /^voicenime$/i

module.exports = handler

async function getBuffer(url, options) {
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