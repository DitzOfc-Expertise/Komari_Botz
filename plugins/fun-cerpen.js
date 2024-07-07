let { randomCerpen } = require("../scrape/random");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  let cerpen = await randomCerpen();
  let { status, judul, penulis, sumber, cerita } = cerpen;
  if (status !== true) throw `*Cerpen tidak di temukan*`;
  let hasil = `*± R A N D O M   C E R P E N*
================================
*° Title:* ${judul}
*° Source:* ${sumber}
*° Author:* ${penulis}
================================
${cerita}
`;
  conn.sendMessage(
    m.chat,
    {
      text: hasil,
      contextInfo: {
        externalAdReply: {
          title: "AkiraaBot Multi device\nThe knowledge WhatsApp bot",
          body: wm,
          thumbnailUrl:
            "https://media.karousell.com/media/photos/products/2023/9/16/hamzah_hussin__pagar_bukan_pen_1694848742_cdb3a179_progressive.jpg",
          sourceUrl: "https://アキラ.site/",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: fkontak },
  );
};
handler.help = ["cerpen"].map((a) => a + " *[random cerpen]*");
handler.command = ["cerpen"];
handler.tags = ["fun"];
handler.limit = true;
module.exports = handler;
