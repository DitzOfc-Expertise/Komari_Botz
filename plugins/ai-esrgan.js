let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.esrgan*', m)
    let media = await q.download()
    let url = await uploadImage(media)
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const apiURL = 'https://api.itsrose.life/image/esrgan';
    const options = {
    method: 'POST',
    headers: {
    'accept': 'application/json',
    'Authorization': global.rose,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "init_image": url,
    "json": true,
    "algo": "esrgan"
    })
    };
    fetch(apiURL, options)
    .then(response => response.json())
    .then(data => {
    if (data.status) {
    conn.sendFile(m.chat, Buffer.from(data.result.base64Image, "base64"), '', '*Powered by :* _https://api.itsrose.life_', m)
    } else {
    conn.reply(m.chat, `Error: ${data.message}`, m)
    }
    })
};
handler.help = ["esrgan *<image>*"]
handler.tags = ["diffusion","ai","convert"]
handler.command = ["esrgan"]
handler.premium = false

module.exports = handler