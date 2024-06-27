let yts = require('yt-search');

let handler = async (m, { text, conn }) => {
  if (!text) return reply('• *Example :* .yts tentang perasaanku')

  let results = await yts(text);
  if (results.videos.length === 0) throw 'No results found';

  let videoId = results.videos[0].videoId;
  let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  let sections = results.all.slice(0, 20).map(result => ({
    title: result.title,
    rows: [{
      title: 'Get Video',
      description: `Get Video From "${result.title}"`,
      id: `.ytmp4 ${result.url}`
    },
    {
      title: 'Get Audio',
      description: `Get Audio From "${result.title}"`,
      id: `.ytmp3 ${result.url}`
    }]
  }));

  await conn.sendListImg(m.chat, '*Berhasil! Silahkan Pilih Result Di Bawah Ini!', 'Powered by *Dev. Expertise*', 'YouTube Search Results', sections, thumbnailUrl, m);
};

handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>');
handler.tags = ['tools'];
handler.command = /^yts(earch)?$/i;
handler.limit = true;

module.exports = handler;
