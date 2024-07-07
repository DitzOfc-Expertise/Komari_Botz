const fetch = require('node-fetch');
const axios = require('axios');
const Baileys = require("@whiskeysockets/baileys")

let previousMessages = [];
conn.aihutao = conn.aihutao ? conn.aihutao : {};

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* .${command} Siapa presiden Indonesia?`, m)

  let name = conn.getName(m.sender);
  conn.aihutao[m.sender] = true;
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=${global.lolkey}&query=hutao`);
  let p = await tio.json();
  let url = p.result[Math.floor(Math.random() * p.result.length)];
  let messages = [
    ...previousMessages,
    { role: 'system', content: `Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Hutao, dan kamu adalah karakter dari game. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere` },
    { role: 'user', content: text }
  ];
  let ini = (await axios.post(`https://skizo.tech/api/openai?apikey=${global.xzn}`, { messages })).data;
 
  let msg = Baileys.generateWAMessageFromContent(
m.chat,
{
interactiveMessage: {
body: {
text: `\n${ini.result}\n`
},
footer: {
text: 'Powered by : DitzOfc'
},
header: {
title: '`AI - HUTAO`',
hasMediaAttachment: true,...(await Baileys.prepareWAMessageMedia({ image: { url: url } }, { upload: conn.waUploadToServer }))
},
nativeFlowMessage: {
buttons: []
}
}, 
},
{
quoted: fkontak,
contextInfo: {
mentionedJid: [m.sender]
}
}
);
await conn.relayMessage(m.chat, msg.message, m)
  
  previousMessages = messages;
};

handler.help = ['hutao *<text>*'];
handler.command = /^hutao$/i
handler.tags = ['ai'];
handler.premium = false;

module.exports = handler;