const fs = require("fs");

let handler = async (m, { usedPrefix, command, conn, from, quoted }) => {
  let q = m.quoted || m;
  let mime = (q.msg || q).mimetype || "";

  if (/image/.test(mime)) {
    let media = await conn.downloadAndSaveMediaMessage(q, new Date() * 1);
    conn.sendImageAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author,
    });
    await fs.unlinkSync(media);
  } else if (/video/.test(mime)) {
    if (q.seconds > 11) return m.reply("*[ ! ] Max 10 Second*");
    let media = await conn.downloadAndSaveMediaMessage(q, new Date() * 1);
    conn.sendVideoAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author,
    });
    await fs.unlinkSync(media);
  } else {
    m.reply(`*• Example :* ${usedPrefix + command} *[reply/send media]*`);
  }
};

handler.help = ["sticker", "s"].map((a) => a + " *[reply/send media]*");
handler.tags = ["sticker"];
handler.command = ["s", "sticker"];

module.exports = handler;
