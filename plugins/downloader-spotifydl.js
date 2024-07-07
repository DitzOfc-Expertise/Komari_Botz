const fetch = require('node-fetch');
const fs = require('fs');

let handler = async (m, { conn, text }) => {
  if (!text) {
    conn.reply(m.chat, '• *Example :* .spotifydl https://open.spotify.com/track/xxxxx', m)
    return;
  }

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
   
   
   let hasil = await spotify(text)
   conn.sendFile(m.chat, hasil, 'audio.mp3', '', m);


};

handler.command = ['spotifydl'];
handler.tags = ['downloader'];
handler.help = ['spotifydl'].map(v => v + ' *<url>*')
handler.group = false;
handler.register = true;

module.exports = handler;

async function spotify(url){
const res=await fetch('https://api.spotify-downloader.com/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'link='+url})
return res.json();
}