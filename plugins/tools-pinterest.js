let axios = require('axios');

let handler = async(m, { conn, command, text, args }) => {
  if (!text) return conn.reply(m.chat, 'Mau cari apa?', m);
  await conn.reply(m.chat, 'Bentar yah aku cariin dulu :)', m);
  try {
    let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let res = data.resource_response.data.results.map(v => v.images.orig.url);
    let ult = res.splice(0, 4);
    let i = 1;
    let cards = [];

    for (let pus of ult) {
      cards.push({
        header: '',
        body: `Hasil Pencarian Ke - ${i++}`,
        footer: 'Powered By Dev. Expertise',
        imageUrl: pus,
        buttons: [{
          type: 'url',
          text: 'Lihat di web',
          url: `https://www.pinterest.com/search/pins/?rs=typed&q=${text}`
        }]
      });
    }
    await conn.sendButtonCard(m.chat, 'Hai kak, Ini hasil pencarian nya :)', global.footer, cards, m); 
  } catch (e) {
    console.error("Error fetching Pinterest data:", e);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data dari Pinterest', m);
  }
};
handler.help = ["pin", "pinterest"]
handler.tags = ["internet"]
handler.command = /^pin$/i;

module.exports = handler;
