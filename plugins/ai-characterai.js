let fetch = require('node-fetch')
let handler = async(m, { conn, text , command }) => {
if (command == 'rimuru') {
if (!text) return conn.reply(m.chat, `.${command} hallo rimuru`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=rimuru&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'anos') {
if (!text) return conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=anos&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'jokowi') {
if (!text) return conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=jokowi&apiKey=Fardankey`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'megawati') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=megawati&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'yaemiko') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=yaemiko&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'paimon') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=paimon&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'putin') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=putin&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
if (command == 'lisa') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=lisa&apiKey=${yanz}`)
let tenka = await res.json()
conn.reply(m.chat, `${tenka.result}`, m)
}
}
handler.help = ['rimuru','tenka','jokowi','megawati','yaemiko','paimon','kiku','putin','lisa'].map(v => v + ' *<teks>*')
handler.command = /^rimuru|tenka|jokowi|megawati|yaemiko|paimon|kiku|putin|lisa$/i
handler.tags = ['ai']
handler.limit = true

module.exports = handler