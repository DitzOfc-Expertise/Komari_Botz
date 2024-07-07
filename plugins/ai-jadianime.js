const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    // Pastikan ada teks setelah perintah
    if (!mime || !text) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix}${command} <text>* to add the text you want to add to your photo`, m);
    
    let media = await q.download();
    let url = await uploadImage(media);
    
    conn.sendMessage(m.chat, {
        text: 'Wait... Generating Your Image'
    }, { quoted: m });
    
    try {
        const apiURL = 'https://api.itsrose.rest/image/turnMe';
        
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': global.rose,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                init_image: url,
                style: 'anime',
                skin: 'default',
                image_num: 1,
                prompt: text,
                strength: 0.6
            })
        });
        
        let data = await response.json();
        const { status, message, result } = data;
        
        if (!status) {
            m.reply(message);
        } else {
            for (let image of result.images) {
                conn.sendFile(m.chat, image, '', '', m);
            }
        }
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, '🚩 Error occurred while processing your request', m);
    }
}

handler.help = ["jadianime *<text>*"];
handler.tags = ["convert"];
handler.command = /^(jadianime)$/i;
handler.limit = true;

module.exports = handler;
