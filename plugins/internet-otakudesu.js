const fetch = require("node-fetch");
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys");

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} hunter x hunter`, m);
  }
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });
  try {
    let apiUrl = `https://api.xyro.fund/api/myanimelist?query=${encodeURIComponent(text)}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data.data || !data.data.response) {
      throw new Error('Invalid API response');
    }
    let results = data.data.response.slice(0, 8);
    let thumbnailUrl = results[0]?.thumbnail
    let teks = results.map(v => `*${v.title}*\nType: ${v.type}\nScore: ${v.score}\nLink: ${v.link}`).join('\n\n');
    let sections = results.map(result => ({
      title: result.title,
      rows: [
        {
          title: 'Get Details',
          description: `Get details for "${result.title}"`,
          id: `.otakuget ${result.link}`
        }
      ]
    }));
    await conn.sendListImg(m.chat, teks, global.footer, 'Click Here!', sections, thumbnailUrl, m)

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Sorry, there was an error processing your request.', m);
  }
}

handler.help = ['otakudesu *<text>*'];
handler.tags = ['internet'];
handler.command = /^(otakudesu)$/i;

module.exports = handler;
