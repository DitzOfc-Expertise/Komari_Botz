let fetch = require('node-fetch')

async function before(m, {
    isOwner,
    conn
}) {
    let chat = db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned) {
     if (m.sender === conn.user.jid) return; // Fixed that error
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
       let response = await fetch('https://api.simsimi.vn/v1/simtalk', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: new URLSearchParams({
        text: m.text,
        lc: 'id',
        key: ''
        })
        })
        let json = await response.json()
        this.reply(m.chat, json.message, m)
        return !0
    }
    return !0
}
module.exports = {
    before,
};