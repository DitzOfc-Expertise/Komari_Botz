let Tiktok = require('../scrape/tiktok.js');
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) {
    conn.sendPresenceUpdate("composing", m.chat);
    return conn.reply(m.chat, `• *Example :* .tiktok https://vm.tiktok.com/xxxxx`, m);
  }
  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Make sure the link is from TikTok', m);
  }
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
    let tiktok = new Tiktok();
    let data = await tiktok.downloader(text); 
    let f = 1;
    if (!data.download || !Array.isArray(data.download)) {
          console.log('Download data is not valid:', data.download);
      throw new Error('Invalid download data');
    }

    for (let i of data.download) {
      if (i.type === 'no-watermark') {
        await conn.sendMessage(m.chat, { video: { url: i.link }, mimetype: 'video/mp4', fileName: 'tiktok.mp4', caption: 'Success, Don\'t Forget To Donate' }, { quoted: m });
      } else if (i.type === 'slide') {
        await conn.sendMessage(m.chat, {
          image: { url: i.link },
          caption: `Gambar Ke ${f++}`
        }, { quoted: m });
      } else if(i.type === 'audio') {
        conn.sendMessage(m.chat, {
    audio: {
    url: `${i.link}`
    },
    mimetype: 'audio/mp4', 
    fileName: `komari.mp3`
    },{ quoted: m})
      }
    }
  } catch (e) {
    console.error(e);
    m.reply('Sorry, an error occurred.');
  }
};

handler.help = ['tiktok'].map(v => v + ' *<url>*');
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.limit = false;
handler.group = false;
handler.regiser = true;

module.exports = handler;
