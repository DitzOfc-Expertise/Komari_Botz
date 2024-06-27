let FormData = require("form-data");
let { fromBuffer } = require("file-type");
let fakeUserAgent = require("fake-useragent");
let crypto = require("crypto");

let randomBytes = crypto.randomBytes(5).toString("hex")
let createFormData = (content, fieldName, ext) => {
  let { mime } = fromBuffer(content) || {};
  let formData = new FormData();
  formData.append(fieldName, content, `${randomBytes}.${ext}`);
  return formData;
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted)
    throw `*• Example :* ${usedPrefix + command} sticker`;
  if (!text) throw `*• Example :* ${usedPrefix + command} owner`;
  await m.reply('please wait')
    let hash = m.quoted.fileSha256.toString("base64");
    db.data.sticker[hash] = {
      message: text,
      creator: m.name,
      jid: m.sender,
      url: await catbox(await m.quoted.download()),
    };
    await m.reply(`> _Succes Menambah Command: ${text}_`)
}
handler.tags = ["premium"]
handler.help = ["setcmd *<sticker>*"]
handler.command = ["setcmd"];
handler.premium = true;

module.exports = handler;

async function catbox(content) {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = createFormData(content, "fileToUpload", ext);
      formData.append("reqtype", "fileupload");
      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });
      return await response.text();
    } catch (error) {
      throw false;
    }
}