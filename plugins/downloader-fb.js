const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[Facebook url]*`;
  m.reply("*[ PROCESSING.... ]*");
  try {
    let fb = await (
      await fetch("https://skizo.tech/api/fb", {
        method: "POST",
        body: JSON.stringify({
          url: text,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Akiraa",
        },
      })
    ).json();
    conn.sendMessage(
      m.chat,
      {
        video: {
          url: fb[0].url,
        },
        caption: "*[ FACEBOOK DOWNLOADER ]*",
      },
      { quoted: m },
    );
  } catch (e) {
    throw "*[ ERROR CAN'T DOWNLOAD FACEBOOK ]*";
  }
};
handler.help = ["fb", "facebook", "fbdl"].map((a) => a + " *[Facebook url]*");
handler.tags = ["downloader"];
handler.command = ["fb", "facebook", "fbdl"];
module.exports = handler;
