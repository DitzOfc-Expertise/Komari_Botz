let fs = require("fs");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[filename]*`;

  if (command === "sf") {
    if (!m.quoted) throw `*Reply your code*`;
    let path = `plugins/${text}.js`;
    await fs.writeFileSync(path, m.quoted.text);
    let key = await conn.sendMessage(
      m.chat,
      { text: "Saviing a code..." },
      { quoted: m },
    );
    await conn.sendMessage(
      m.chat,
      {
        text: `Code succesfully to saved!`,
        edit: key.key,
      },
      { quored: m },
    );
  } else if (command === "df") {
    let path = `plugins/${text}.js`;
    let key = await conn.sendMessage(
      m.chat,
      { text: "Deleted code..." },
      { quoted: m },
    );
    if (!fs.existsSync(path))
      return conn.sendMessage(
        m.chat,
        { text: `I can't find the code`, edit: key.key },
        { quored: m },
      );
    fs.unlinkSync(path);
    await conn.sendMessage(
      m.chat,
      { text: `Succes deleted file`, edit: key.key },
      { quored: m },
    );
  }
};
handler.help = ["sf", "df"]
handler.tags = ["owner"];
handler.command = /^(sf|df)$/i;
handler.rowner = true;
module.exports = handler;
