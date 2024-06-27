var moment = require('moment-timezone')

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    isOwner
}) => {
let pplu = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
let fkontak = {
            key: {
                participant: `13135550002@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                "contactMessage": {
                    'displayName': `Bidoata Owner`,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ditzGans,;;;\nFN: Hai Kak!!!\nitem1.TEL;waid=${m.sender.split("@")[0]}:+${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': pplu,
                    thumbnail: pplu,
                    sendEphemeral: true
                }   
            }
        }
await conn.sendPresenceUpdate("composing", m.chat)
let teksbio = `${htki} *BIODATA* ${htka}
${htjava} *💌 Nama* : DitzOfc
${htjava} *✉️ Nama RL* : Adit
${htjava} *♂️ Gender* : Boys
${htjava} *🕋 Agama* : Islam
${htjava} *⏰ Tanggal lahir* : Private 🥶
${htjava} *🎨 Umur* : PRIVATE
${htjava} *🧮 Kelas* : PRIVATE
${htjava} *🧩 Hobby* : MODIFIKASI WHATSAPP
${htjava} *💬 Sifat* : ASIK DAH KALAU DAH KENAL
${htjava} *🗺️ Tinggal* : Jawa Barat, Bogor
${htjava} *❤️ Waifu* : Tenka Izumo
${htjava} *👥  Status* : Single Jir

${htjava} *📷 ɪɴsᴛᴀɢʀᴀᴍ* : https://www.instagram.com/wayssokasik
•·––––––––––––––––––––––––––·•
`
let teks = 'Pilih dibawah kak ! o(〃＾▽＾〃)o'
var sections = [
   {
	title: `INFORMASI OWNER`,
	rows: [
	{title: "📱 • Nomor", rowId: ".owner"},
	{title: "🎨 • Thankyuu", rowId: ".tqto"},
	]
    },{
	title: `${htjava} SUPPORT ME –––––––·•`,
	rows: [
	    {title: "💹 • Donasi", rowId: ".donasi"},
	{title: "🔖 • Sewa", rowId: ".shop"},
	{title: "🌟 • Buy Premium", rowId: ".premium"},
	]
  },
]

var listMessage = {
  text: teksbio,
  footer: teks,
  title: `MASIH PEMULA PUH 😷👍`,
  buttonText: "CLICK HERE ⎙️",
  sections
}
await await conn.sendMessage(m.chat, listMessage, {
    quoted: fkontak
});
}
handler.premium = false
handler.command = /^(biodata)$/i
handler.register = true
handler.private = true
module.exports = handler 

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}