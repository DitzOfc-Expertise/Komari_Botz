let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*• Example :* ${usedPrefix + command} https://www.capcut.com/t/Zs8F2jgx7`;
  m.reply(wait);
  try {
    let res = await capcut(text);
    conn.sendFile(
      m.chat,
      res.video,
      null,
      `*• Thumbnail:* ${res.thumbnail}\n• *Url:* ${text}`,
      m,
    );
  } catch (e) {}
};
handler.help = ["capcut"].map((a) => a + " *[url capcut]*");
handler.tags = ["downloader"];
handler.command = ["capcut"];
module.exports = handler;

async function capcut(url) {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);

  return {
    thumbnail: $("video").attr("poster"),
    video: $("video").attr("src"),
  };
}
