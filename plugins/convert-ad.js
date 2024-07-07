let uploadImage = require('../lib/uploadImage.js')
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.ad*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
    conn.sendFile(m.chat, `https://api.popcat.xyz/ad?image=${url}`, '', done, m)
}
handler.help = ["ad *<image>*"]
handler.tags = ["convert"]
handler.command = /^(ad)$/i
handler.limit = true
handler.register = true
module.exports = handler;