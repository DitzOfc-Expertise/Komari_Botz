let { performance } = require('perf_hooks')
let handler = (m) => m;

handler.all = async (m) => {
    if (!m.message)
        return;

    this.spam = this.spam ? this.spam : {};
    let chat = global.db.data.chats[m.chat];

    if (chat.antiSpam) {
        if (m.sender in this.spam) {
            let spamData = this.spam[m.sender];
            spamData.count++;
            let currentTime = m.messageTimestamp.toNumber();

            if (currentTime - spamData.lastspam < 5) {
                if (spamData.count > 1) { // Adjusted from 5 to 1 since the condition is already within 5 seconds
                    global.db.data.users[m.sender].banned = true;
                    global.db.data.users[m.sender].bannedDate = new Date().getTime() + (30 * 60 * 1000); // 30 minutes ban

                    let caption = `Jangan spam kak! Kamu telah dibanned selama 30 menit.`;
                    this.reply(m.chat, caption, m);
                }
            } else {
                spamData.count = 1;
                spamData.lastspam = currentTime;
            }
        } else {
            this.spam[m.sender] = {
                jid: m.sender,
                count: 1,
                lastspam: m.messageTimestamp.toNumber()
            };
        }
    }
};

module.exports = handler;
