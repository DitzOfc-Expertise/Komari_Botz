let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted)
    throw `*Reply a Message*`;
  try {
    let delet = m.message.extendedTextMessage.contextInfo.participant;
    let bang = m.message.extendedTextMessage.contextInfo.stanzaId;
    return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: bang,
        participant: delet,
      },
    });
  } catch {
    return conn.sendMessage(m.chat, { delete: m.quoted.key });
  }
};
handler.help = ["delete", "del"]
handler.tags = ["group"];
handler.command = ["del", "delete"];
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
