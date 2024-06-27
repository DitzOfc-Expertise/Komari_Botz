let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted)
    throw `*• Example :* ${usedPrefix + command} *[reply sticker]*`;

  let array = Object.keys(db.data.sticker);

  if (array.includes(await m.quoted.fileSha256.toString("base64"))) {
    m.reply("Succes deleted Command");
    delete db.data.sticker[await m.quoted.fileSha256.toString("base64 ")];
  } else {
    return m.reply("Command Not Found");
  }
};

handler.help = ["delcmd"].map((a) => a + " [premium only]");
handler.tags = ["premium"];
handler.command = ["delcmd"];
handler.premium = true;

module.exports = handler;
