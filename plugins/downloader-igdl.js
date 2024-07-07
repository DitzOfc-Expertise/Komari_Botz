let handler = async(m, { text, command, usedPrefix }) => {
  if(!text) return m.reply(`Example: ${usedPrefix + command} link`)
  m.reply('Please Wait...')
  try {
    let res = await Func.fetchJson(`https://anabot.my.id/api/download/instagram?url=${text}&apikey=DitzOfc`)
    let kon = res.result
    for (let i of kon) {
     conn.sendFile(m.chat, i.url, '', 'Done', m)
    }
  } catch (e) {
   console.log(e)
   m.reply(e)
  }
}

handler.tags = ["downloader"]
handler.help = ["ig *<url*>"]
handler.command = ["ig", "igdl"]

module.exports = handler