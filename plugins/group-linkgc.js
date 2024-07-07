let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(
    `Link Group : *https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}*`,
  );
};
handler.help = ["linkgc"]
handler.tags = ["group"];
handler.command = ["linkgc"];
handler.group = true;
handler.botAdmin = true;
module.exports = handler;
