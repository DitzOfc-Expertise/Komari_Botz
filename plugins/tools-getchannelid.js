let handler = async (m, {conn}) => {
if (!m.quoted) throw 'repy pesan saluran'
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
let teks = '```Channel Name:```' + ' `' + `${id.newsletterName}` + '`\n'
teks += '```Channel Id:```' + ' `' + `${id.newsletterJid}` + '`'
await conn.reply(m.chat, teks.trim(), m)
} catch (e) {
throw 'Harus chat dari channel'
}
}
handler.help = handler.command = ['ci']
handler.tags = ['main']
module.exports = handler