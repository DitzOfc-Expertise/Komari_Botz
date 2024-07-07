let handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = db.data.users[m.sender];
  if (!text) throw `*Example :* ${usedPrefix + command} Your id`;
  const { key } = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });
  try {
    if (!user.registered)
      return conn.sendMessage(
        m.chat,
        { text: "Kamu tidak terdaftar", edit: key },
        { quoted: m },
      );
    if (text === user.sn) {
      user.sn = "Unreg";
      user.registered = false;
      await conn.sendMessage(
        m.chat,
        { text: "Succes...", edit: key },
        { quoted: m },
      );
    } else
      return conn.sendMessage(
        m.chat,
        { text: "Your id has invalid", edit: key },
        { quoted: m },
      );
  } catch (e) {}
};
handler.help = ["unreg", "unregister"]
handler.tags = ["main"];
handler.command = ["unreg", "unregister"];

module.exports = handler;
