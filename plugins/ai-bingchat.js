const axios = require("axios");
const uploadImage = require("../lib/uploadImage.js");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else return m.reply(`• *Example :* ${usedPrefix + command} halo`);
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || ""

  if (!mime) {
    try {
      const url = 'https://api.itsrose.life/chatGPT/bing_chat';
      const data = {
        "prompt": text,
        "time_zone": "Asia/Jakarta",
        "tone": "Balanced",
        "strip_markdown": false
      };

      postData(url, data)
        .then(responseData => {
          if (!responseData.status) return m.reply(responseData.message);
          m.reply(responseData.result.message.content);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      await m.reply(eror);
    }
  } else {
    let media = await q.download();
    let isTele = /image\/(png|jpe?g)/.test(mime);
    let link = await uploadImage(media);
    const url = 'https://api.itsrose.life/chatGPT/bing_chat?apikey=' + global.rose;
    const data = {
      "prompt": text,
      "init_image": link,
      "time_zone": "Asia/Jakarta",
      "tone": "Balanced",
      "strip_markdown": false
    };

    postData(url, data)
      .then(responseData => {
        m.reply(responseData.result.message.content);
      })
      .catch(error => {
        console.error(error);
      });
  }
};

handler.command = ['bingchat','bing']
handler.help = ["bing *<text>*","bingchat *<text>*"];
handler.tags = ["ai"];
handler.premium = true;
module.exports = handler;

async function postData(url, data) {
  try {
    const response = await axios.post(url, data, {
headers: {
Authorization: global.rose
}
});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}