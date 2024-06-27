let handler = async (m, { conn, text, usedPrefix, command }) => {
  const data = db.data.sticker;
  let result = "";
  let index = 1;
  for (const key in data) {
    result += `*List command*`
    result += `*${index}. ${data[key].message}*\n`;
    result += `Creator : ${data[key].creator}\n`;
    result += `Jid : wa.me/${data[key].jid.split("@")[0]}\n`;
    result += `Sticker : ${data[key].url}\n\n`;
    index++;
  }
  m.reply(result);
};
handler.help = ["listcmd"]
handler.tags = ["premium"];
handler.command = ["listcmd"];
handler.premium = true;

module.exports = handler;
