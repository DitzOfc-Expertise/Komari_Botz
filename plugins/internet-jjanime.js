const { ttSearch } = require("../scrape/api.js");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    m.reply(wait);
    let res = await ttSearch("Preset am anime sound old 2020");

    let random = Math.floor(Math.random() * res.videos.length);
    let file = res.videos[random];
    let url = "https://tikwm.com" + file.play;

    conn.sendFile(m.chat, url, "error.jpg", "*[ RANDOM JJ ANIME ]*", m);
  } catch (err) {
    m.reply("*[ VIDEO NOT FOUND ]*");
  }
};

handler.help = ["jjanime"].map((a) => a + " *[random video jj]*");
handler.tags = ["internet"];
handler.command = ["jjanime"];
module.exports = handler;
