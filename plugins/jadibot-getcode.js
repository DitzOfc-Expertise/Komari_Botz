let fs = require('fs')

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
if (global.conn.user.jid == conn.user.jid) return conn.reply(m.chat, '```Command Ini Hanya Untuk User Yang Sudah Jadibot```', m)
if (!text) return conn.reply(m.chat, '• *Example :* .getcode 6288980870067', m)
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
conn.sendMessage(m.chat, {text : '.jadibot' + " " + Buffer.from(fs.readFileSync(`./plugins/jadibot/` + text + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
}
handler.help = ['getcode *<number>*']
handler.tags = ['jadibot']
handler.command = /^(getcode)$/i

module.exports = handler