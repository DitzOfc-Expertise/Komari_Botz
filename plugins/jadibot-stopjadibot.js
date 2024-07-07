var path = require("path");
var fs = require("fs");

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (global.conn.user.jid == conn.user.jid) return conn.reply(m.chat, '```Command Ini Hanya Untuk User Yang Sudah Jadibot```', m)
if (!text) return conn.reply(m.chat, '• *Example :* .stopjadibot 6288980870067', m)
await conn.reply(m.chat, '```Sayonara ~_~```', m)
let filePath = path.join(process.cwd(), `./plugins/jadibot/${text}/creds.json`)
if (fs.statSync(filePath).isDirectory()) {
fs.rmdirSync(filePath, { recursive: true })
} else {
fs.unlinkSync(filePath)
}
let nomer = `${text}`
let del = global.conns.indexOf(nomer)
global.conns.splice(del, 1)
conn.ws.close()
}
handler.help = ['stopjadibot *<number>*']
handler.tags = ['jadibot']
handler.command = /^(stopjadibot)$/i
handler.owner = true

module.exports = handler