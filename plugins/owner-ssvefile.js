let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} /lib/simple`;
  if (!m.quoted.text) throw `Reply Code!`;
  let path = `${text}`;
  await require("fs").writeFileSync(path, m.quoted.text);

  m.reply(`File Saved!`);
};

handler.help = ["savefile"]
handler.tags = ["owner"];
handler.command = ["savefile"];

handler.owner = true;
module.exports = handler;
