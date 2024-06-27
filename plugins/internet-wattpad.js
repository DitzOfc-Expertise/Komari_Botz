const { Wattpad } = require('../scrape/wattpad')
let fetch = require("node-fetch")
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys")
let handler = async(m, { text, command, conn, args }) => {
  if (command === 'wattpad') {
  if (!text) return m.reply('Judul?')
  m.reply('Sabar...')
  try {
    var a = new Wattpad
    var b = await a.search(text)
    let sections = [{
    rows: []
    }]
    for(let i of b.data) {
      sections[0].rows.push({
        title: `${i.title}`,
        id: `wattget ${i.url}`
      })
    }
let listMessage = {
  title: 'Click Here!',
  sections,
}
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
 message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({
}),
footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Powered By _Dev. Expertise_'
}),
header: proto.Message.InteractiveMessage.Header.create({
  title: 'Pencarian mu berhasil! Pilih Wattpad mu pada listmenu di bawah!',
  hasMediaAttachment: false
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
  {
  "name": "single_select",
  "buttonParamsJson": JSON.stringify(listMessage) 
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
  } catch (e) {
    console.log('Error found! :', e)
    m.reply('Sorry error')
  } 
} else if (command === 'wattget') {
  if (!text) {
    return;
  }
  m.reply('Tunggu sebentar...');
  try {
    let res = await fetch(`https://api.neoxr.eu/api/wpget?url=${text}&apikey=${global.neo}`);
    let hasil = await res.json();
    
    // Mengakses objek data dari hasil
    let data = hasil.data;

    // Pastikan data ada
    if (!data) {
      m.reply('Data tidak valid.');
      return;
    }

    let sections = [{
      rows: []
    }];

    // Membuat teks untuk judul dan deskripsi
let teks = `
Judul: ${data.title}
Author: ${data.author}
Di Baca Sebanyak: ${data.reads}
Jumlah Votes: ${data.votes}
    
_Description_
${data.description}`;

    // Menambahkan bagian (parts) ke dalam sections
    for (let e of data.parts) {
      sections[0].rows.push({
        title: `${e.title}`,
        description: `Pilih Disini.`,
        id: `wattread ${e.url}`
      });
    }

    let listMessage = {
      title: 'Pilih Disini',
      sections
    };

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'Powered By _Dev. Expertise_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: teks,
              hasMediaAttachment: true,
              ...await prepareWAMessageMedia({ image: { url: data.thumbnail } }, { upload: conn.waUploadToServer })
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify(listMessage)
                }
              ],
            })
          })
        }
      }
    }, { userJid: m.chat, quoted: m });

    conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
  } catch (e) {
    m.reply('Sorry error...');
    console.log('Error Found:', e);
  }
} else if (command === 'wattread') {
  if (!text) {
  return
  }
 m.reply('Tunggu sebentar...')
 const more = String.fromCharCode(8206)
 const readmore = more.repeat(4001)
 try {
   let res = await fetch(`https://api.neoxr.eu/api/wpread?part=${text}&apikey=${global.neo}`)
   let hasil = await res.json()
let wattpad = `
${hasil.data.part}
*${hasil.data.title}*
//SELAMAT MEMBACA//
${readmore}
${hasil.data.content}
`
await conn.sendMessage(m.chat, { text: wattpad }, { quoted: m })
 } catch (e) {
 m.reply('Sorry error:', e)
 console.log(e)
 }
}
}
handler.command = /^(wattpad|wattget|wattread)$/i

module.exports = handler