let similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hcak/i.test(m.quoted.text) || /.*hcak/i.test(m.text))
        return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    if (!(id in this.caklontong))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.caklontong[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.caklontong[id][2]
            this.reply(m.chat, `✅ *Benar!*\n+${this.caklontong[id][2]} XP`, m)
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `❌ *Salah!*`, m)
    }
    return !0
}
handler.exp = 0

module.exports = handler

const buttoncaklontong = [
    ['caklontong', '/caklontong']
]