let fs = require('fs')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async (m, { conn, text, usedPrefix, command }) => {
let res = await fetch('https://api.github.com/repos/DitzOfc-Expertise/Komari_Botz')
let json = await res.json()
let sc = `乂  *B O T - S C R I P T*\n\n`
sc += `┌  ◦  *Name* : ${json.name}\n`
sc += `│  ◦  *Visitor* : ${json.watchers_count}\n`
sc += `│  ◦  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`
sc += `│  ◦  *Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
sc += `└  ◦  *Url* : ${json.html_url}`
let tqto = `乂  *B I G - T H A N K S T O*\n\n`
tqto += `┌  ◦  _Dev. Expertise Team_\n`
tqto += `│  ◦  _Lenwy_\n`
tqto += `│  ◦  _Shannz_\n`
tqto += `└  ◦  _Pipe Scratch Team_\n`
tqto += `Komari_Botz, Made by ©DitzOfc`
conn.sendMessage(m.chat, {
text: `${sc}\n\n${tqto}`,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
title: 'Komari_Botz',
thumbnailUrl: 'https://telegra.ph/file/ac299e01e76c911d7f25a.jpg',
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
}
handler.help = ['sc']
handler.tags = ['main','info']
handler.command = /^(sc|script)$/i
module.exports = handler