var { format } = require("util");
var { Image } = require("node-webpmux");

var handler = async (m) => {
  if (!m.quoted) return m.reply("*• Example :* .getexif *[reply sticker]*");
  if (/sticker/.test(m.quoted.mtype)) {
    var gambar = new Image();
    await gambar.load(await m.quoted.download());
    m.reply(format(JSON.parse(gambar.exif.slice(22).toString())));
  }
};
handler.help = ["exif"].map((a) => a + " *[reply sticker]*");
handler.tags = ["sticker"];
handler.command = ["exif"];
module.exports = handler;
