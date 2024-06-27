let handler = async (m, { conn, text, usedPrefix, command }) => {
  let array = require("fs").readFileSync("./database/image.json");
  m.reply(`*List Image In Database :*\n==========================\n${JSON.parse(
    array,
  )
    .map((a, i) => `*${i + 1}.* ${a.name}`)
    .join("\n")}
==============================
Type *.getimg [number]* to get Image`);
};
handler.help = ["listimg"]
handler.tags = ["tools"];
handler.command = ["listimg"];
module.exports = handler;
