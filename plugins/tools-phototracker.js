let fetch = require("node-fetch")
let uploadImage = require('../function/uploadImage.js')

let handler = async (m, { conn, args, command }) => {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || q.mediaType || "";
if (!mime) return conn.reply(m.chat, `Fotonya Mana Kak?`, m);
if (!/image\/(jpe?g)/.test(mime)) throw 'Unsupported format.';
let tenka = await conn.reply(m.chat, 'Mengidentifikasi gambar...', m)
try {
 let img = await q.download()
 let upload = await uploadImage(img)
 let response = await fetch(`https://api.neoxr.eu/api/photo-tracker?image=${upload}&apikey=${global.neo}`)
 let res = await response.json()
 conn.sendMessage(m.chat, { text: `${res.data}`, edit: tenka })
 } catch (e) {
 console.log(e)
 m.reply('Error:(')
 }
}
handler.tags = ["tools"]
handler.help =["ptrack *<image>*"]
handler.command = /^(ptrack)$/i

module.exports = handler