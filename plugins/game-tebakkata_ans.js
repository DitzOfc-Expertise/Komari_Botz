const similarity = require('similarity');
const threshold = 0.72;


let handler = m => m
handler.before = async function (m) {  
     let id = m.chat;
    console.log(`Handler.before called with message: ${m.text}`);
    if (!m.quoted) {
        console.log('No quoted message');
        return true;
    }
    if (!m.quoted.fromMe) {
        console.log('Quoted message is not from the bot');
        return true;
    }
    if (!m.quoted.text) {
        console.log('Quoted message does not contain expected text');
        return true;
    }
    console.log(`Checking quoted message text: ${m.quoted.text}`);
    if (m.sender === conn.user.jid) {
     return false
    }

    this.tebakkata = this.tebakkata ? this.tebakkata : {};
    if (!(id in this.tebakkata)) {
        return
    }

    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            console.log('Answer is correct');
            global.db.data.users[m.sender].exp += this.tebakkata[id][2];
            await this.reply(m.chat, `*Benar!*\n+${this.tebakkata[id][2]} XP`, m);
            clearTimeout(this.tebakkata[id][3]);
            delete this.tebakkata[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            console.log('Answer is close');
            m.reply(`*Dikit Lagi!*`);
        } else {
            console.log('Answer is incorrect');
            m.reply(`*Salah!*`);
        }
    } else {
        console.log('Quoted message ID does not match the question');
    }
    return true;
};

module.exports = handler;