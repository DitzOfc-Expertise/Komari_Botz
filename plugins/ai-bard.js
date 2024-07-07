const { question, image } = require("../lib/scrape/bardie.js")
const uploadImage = require("../lib/uploadFile")
let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else return m.reply("• *Example:* .bard cara menikmati kelamin")
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ""
	let adit = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m)
	if (!mime) {
			let res = await GoogleBard(text)
			await await conn.sendMessage(m.chat, { text: `${res.content}`, edit: adit })
			
	} else {
		let media = await q.download()
		let isTele = /image\/(png|jpe?g)/.test(mime)
		let link = await uploadImage(media)
		let res = await GoogleBardImg(text, link)
		await await conn.sendMessage(m.chat, { text: `${res.content}`, edit: adit })
}
  }
handler.help = ["bard"].map(a => a + " *<text>*")
handler.tags = ["ai"]
handler.command = /^(bard)$/i
handler.premium = true
module.exports = handler

async function GoogleBard(query) {
	return question({ ask: query })
};

async function GoogleBardImg(query, url) {
	return image({ ask: query, image: url })
};