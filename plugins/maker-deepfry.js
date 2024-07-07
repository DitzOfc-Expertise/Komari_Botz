let fetch = require('node-fetch')
let uploadImage = require('../function/uploadImage.js')

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.${command}*`, m)
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://api.lolhuman.xyz/api/deepfry?apikey=${global.lolkey}&img=${url}`)).buffer()
await conn.sendFile(m.chat, hasil, '', '```Success...\nDont forget to donate```', m)
}
handler.help = ['deepfry *<image>*']
handler.tags = ['maker']
handler.command = /^(deepfry)$/i
handler.limit = true

module.exports = handler