let fs = require("fs");
let uploadImage = require("../lib/uploadImage.js");

let syaii = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("*• Example :* .addimg *[reply/send media]*");
  if (!text) throw "*• Example :* .addimg *[name image]*";
  let directory = "./database/image.json"; // Ganti dengan path file JSON yang ingin kamu gunakan
  let media = await q.download();
  let link = await uploadImage(media);
  let jsonData = fs.readFileSync(directory);
  let existingData = JSON.parse(jsonData);
  existingData.push({ name: text, url: link });
  fs.writeFileSync(directory, JSON.stringify(existingData));
  m.reply(`Sucess Add Image to Database : *[ ${directory} ]*`);
};

syaii.help = ["addimg"].map((a) => a + " *[reply/send media]*");
syaii.tags = ["tools"];
syaii.command = ["addimg"];

module.exports = syaii;
