let axios = require("axios")

let handler = async (m, { command, args, text, conn } ) => {
            if (args.length == 0) return m.reply(`📦 *Java / Bedrock*`)
            if (args[0] === 'bedrock') {
                m.reply('Mencari Server...')
axios.get(`https://api.mcstatus.io/v2/status/bedrock/${args[1]}`).then(({ data }) => {
                var caption = `📑 *Minecraft Bedrock Server*\n`
                caption += ` *⨠ IP : ${data.host}*\n`
                caption += ` *⨠ Port : ${data.port}*\n`
                caption += ` *⨠ IP Address : ${data.ip_address}*\n\n`
                caption += `📊 *Server Information*\n`
                caption += ` *⨠ Gamemode : ${data.gamemode}*\n`
                caption += ` *⨠ Player Online : ${data.players.online}/${data.players.max}*\n`
                caption += ` *⨠ Version : ${data.version.name}*\n`
                caption += ` *⨠ Edition : ${data.edition}*\n`
                conn.sendMessage(m.chat , {image: { url: `https://telegra.ph/file/54ff237913e8fdf5774b1.png` }, caption: caption },{ quoted: m })
            })
} else if (args[0] === 'java') {
    m.reply('Mencari Server...')
axios.get(`https://api.mcstatus.io/v2/status/java/${args[1]}`).then(({ data }) => {
                var caption = `📑 *Minecraft Java Server*\n`
                caption += ` *⨠ IP : ${data.host}*\n`
                caption += ` *⨠ Port : ${data.port}*\n`
                caption += ` *⨠ IP Address : ${data.ip_address}*\n\n`
                caption += `📊 *Server Information*\n`
                caption += ` *⨠ Player Online : ${data.players.online}/${data.players.max}*\n`
                caption += ` *⨠ Mods : ${data.mods.name}*\n`
                caption += ` *⨠ Plugins : ${data.plugins.name}*\n`
                caption += ` *⨠ Version : ${data.version.name_clean}*\n`
                conn.sendMessage(m.chat , {image: { url: `https://telegra.ph/file/54ff237913e8fdf5774b1.png` }, caption: caption },{ quoted: m })
            })
} else {
m.reply('⚠️ *Nama Server Tidak Ditemukan*')
}
}
handler.tags = ["tools"]
handler.help = ["mcserver *<option>*"]
handler.command = /^(mcserver)$/i

module.exports = handler