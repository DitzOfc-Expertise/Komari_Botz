const fetch = require('node-fetch')

let handler = async(m, { conn, text, args, command } ) => {
   if (!text) {
   return m.reply('Masukan prompt nya!\ncontoh: .animediff-xl prompt kamu')
   }
   conn.reply(m.chat, 'Wait a minute, Your Image Being Processed', m)
   try {
   let response = await fetch(`https://anabot.my.id/api/ai/animagine?prompt=${text}&apikey=${global.ana}`)
   let hasil = await response.json()
   conn.sendMessage(m.chat, { image: { url: hasil.result.url }, caption: 'Done' }, { quoted: m })
   } catch (e) {
   console.log(e)
   conn.reply('Sorry Error')
   }
 }
handler.help = ['animediff-xl *<text>*']
handler.tags = ['ai', 'diffusion']
handler.command = /^(animediff-xl)$/i
handler.premium = true

module.exports = handler
   