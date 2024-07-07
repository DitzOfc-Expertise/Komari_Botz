let axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dog.`, m)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let adit = await m.reply(`_Process generate image : *${text}*_`)
    let hasil = await getBuffer(`https://anabot.my.id/api/ai/dalle3?prompt=${text}&apikey=DitzOfc`)
    let tenka = await conn.sendMessage(m.chat, { text: `_Success generate image : *${text}*_`, edit: adit })
    await conn.sendFile(m.chat, hasil, 'dalle3.jpg', 'Done', tenka)
};
handler.help = ["dalle3 *<text>*"]
handler.tags = ["ai"]
handler.command = ["dalle3"]
handler.premium = false
handler.register = true
handler.limit = true

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