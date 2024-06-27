async function before(m) {
  let chat = global.db.data.chats[m.chat];
  if (chat.antiBot) {
    if (m.fromMe) return;
    if (m.isBaileys == true) {
       this.reply(m.chat, "Bot Terdeteksi!", m);
       this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }
    return;
  }
}
module.exports = {
    before,
}