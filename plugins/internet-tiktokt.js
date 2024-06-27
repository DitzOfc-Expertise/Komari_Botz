let fetch = require('node-fetch')

let handler = async (m, { conn, text, command }) => {
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let adit = await fetch(`https://skizo.tech/api/tttrending?region=ID&apikey=${global.xzn}`)
  let res = await adit.json()
  let tenka = `乂  *TIKTOK - TRENDING*
 
	◦  *Title :* ${res.title}
	◦  *Views :* ${res.play_count}
	◦  *Author :* ${res.author.nickname}
	
Made By DitzOfc`
  conn.sendFile(m.chat, res.play, 'tiktokt.mp4', tenka, m)
}
handler.help = ['tiktoktrending']
handler.tags = ['downloader']

handler.command = /^tiktokt|tiktoktrending|tttrending$/i
handler.premium = false

module.exports = handler