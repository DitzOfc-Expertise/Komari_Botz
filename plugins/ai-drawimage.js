let {drawImage} = require("haji-api/modules/ai");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Javascript`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let tenka = await drawImage({
    prompt: text
    })
    try {
    for (let i of tenka) {
    await conn.sendFile(m.chat, i, 'drawimage.jpg', '', m)
    }
    } catch (e) {
    await conn.reply(m.chat, '```Status Request :```'+' `Failed`', m)
    }
};
handler.help = ["drawimage *<text>*"]
handler.tags = ["ai"]
handler.command = ["drawimage"]
handler.premium = false

module.exports = handler