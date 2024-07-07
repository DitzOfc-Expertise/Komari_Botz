let fetch = require("node-fetch");
let uploadImage = require('../lib/uploadImage.js');
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");

let handler = async (m, { args, command, usedPrefix, text }) => {
  if (command === 'turnme') {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime || !text) return conn.reply(m.chat, `Send/Reply Images with the caption *${usedPrefix}${command} <text>* to add the text you want to add to your photo`, m);

    let image = await q.download();
    const url = await uploadImage(image);

    let styles = [
      "aether", "airbender", "anime", "anime_3d", "avatar", "baby", "barbie", 
      "beauty", "blindbox", "block", "chocolate", "christmas_3d", "christmas_anime",
      "christmas_cartoon", "christmas_comic", "christmas_pixar", "cyberpunk", 
      "danil", "fairy_tale", "firebender", "ghair", "gothic", "gtav", "hallowen",
      "hallowen_dark", "hell", "heroes", "horror", "illustration", "impasto", 
      "jojo", "junet", "lightning", "luminous", "old", "onepiece", "papercut",
      "pastel", "pixar", "pixar_2", "pixel", "pokemon", "rdr", "retro", 
      "rickmorty", "spirited", "statue", "stylish_new", "stylish_old", "surya",
      "swing", "synthwave", "tatoo", "thunder", "wonka", "zombie"
    ];

    let sections = [{
      rows: []
    }];
    styles.forEach(style => {
      sections[0].rows.push({
        title: 'Click here to set model',
        description: `${style}`,
        id: `.turnmeon ${style} ${text} ${url}`
      });
    });
    await conn.sendListMsg(m.chat, 'Oke! Sekarang Pilih Model Di Bawah Ini!', global.footer, 'Click Here!', sections, m)
  } else if (command === 'turnmeon') {
    if (!text) return;
    m.reply('Wait... Generating Your Image');
    try {
      let args = text.split(' ');
      let style = args[0];
      let teks = args.slice(1, args.length - 1).join(' ');
      let imageUrl = args[args.length - 1];
      
      let urlApi = `https://api.itsrose.rest/image/turnMe`;
      let options = await fetch(urlApi, {
        method: 'POST',
        headers: {
          "accept": 'application/json',
          "Authorization": global.rose,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          init_image: imageUrl,
          style: style,
          skin: "default",
          image_num: 1,
          prompt: teks,
          strength: "0.6"
        })
      });
      let data = await options.json();
      console.log(data)
      const { status, message, result } = data;
      if (!status) {
        m.reply(message);
      } else {
        for (let image of result.images) {
          conn.sendFile(m.chat, image, '', '', m);
        }
      }
    } catch (e) {
      console.log(e);
      await conn.reply(m.chat, '🚩 Error occurred while processing your request', m);
    }
  }
};

handler.tags = ["ai"];
handler.help = ["turnme *<image><text>*"];
handler.command = ["turnme", "turnmeon"];

module.exports = handler;