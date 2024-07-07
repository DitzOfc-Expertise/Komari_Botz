var fetch = require("node-fetch")
var axios = require("axios")
var { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys")

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'film') {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} avatar`, m)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let api = await fetch(`https://api.alyachan.dev/api/film?q=${text}&apikey=${global.alya}`)
  let tenka = await api.json()  
  let sections = [{
  rows: []
  }]
  for(let i of tenka.data) {
  sections[0].rows.push({
  header: i.title,
  title: `Rating: ${i.rating}`, 
  description: `${i.synopsis}`, 
  id: `.filmdetail ${i.url}`
  }) 
  }
  conn.sendListMsg(m.chat, 'Pilih Film Di Bawah Ini!', global.footer, 'Click Here!', section, m)
  } else if (command === 'filmdetail') {
  if (!text) return
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let res = await fetch(`https://api.alyachan.dev/api/filmget?url=${text}&apikey=${global.alya}`)
  let adit = await res.json()
  console.log(adit)
  let teks = '```Genre:```' + ` ${adit.data.genre}\n`
  teks += '```Director:```' + ` ${adit.data.director}\n`
  teks += '```Actors:```' + ` ${adit.data.actors}\n`
  teks += '```Country:```' + ` ${adit.data.country}\n`
  teks += '```Duration:```' + ` ${adit.data.duration}\n`
  teks += '```Ranting:```' + ` ${adit.data.ratings}`
  let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  text: teks
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Powered By _Dev. Expertise_'
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: adit.data.title,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: adit.data.thumbnail } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Streaming Here!","url":"${adit.data.streaming[0].url}","merchant_url":"${adit.data.streaming[0].url}"}`
  },
  {
  name: "cta_url",
  buttonParamsJson: `{"display_text":"Download Here!","url":"${adit.data.download[0].url}","merchant_url":"${adit.data.download[0].url}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
  conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  }
}

handler.help = ['film *<text>*']
handler.tags = ['search']

handler.command = ["film","filmdetail"]
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler