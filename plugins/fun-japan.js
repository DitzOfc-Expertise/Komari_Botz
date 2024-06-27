let handler = async (m, { conn, text, usedPrefix, command }) => {
  let a = await Func.fetchJson(
    `https://github.com/ArifzynXD/database/raw/master/asupan/${command}.json`,
  );
  return m.reply(done, await Func.random(a.map((a) => a.url)));
};
handler.help = ["japan"].map((a) => a + " *[Random image]*");
handler.tags = ["fun"];
handler.command = ["japan"];
module.exports = handler;
