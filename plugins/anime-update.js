const axios = require("axios");
const https = require("https");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.ongoing = conn.ongoing ? conn.ongoing : {};
  m.reply("Tunggu sebentar...");
  let anime = await (
    await fetch("https://animev1.bimabizz.my.id//api/anime/")
  ).json();
  let { key } = await conn.sendFile(
    m.chat,
    anime.data[0].thumbnail,
    null,
    anime.data
      .map(
        (a, index) =>
          `*${index + 1}.* ${a.title.toUpperCase()}\nUpload Time: ${a.upload_time}\n=> ${a.detail_url}\n===========================`,
      )
      .join("\n\n"),
    m,
  );
  await conn.reply(
    m.chat,
    `Silahkan ketik angka *1 sampai ${anime.data.length}*\nSesuai yang ada di atas`,
    null,
  );

  conn.ongoing[m.sender] = anime;
};

handler.before = async (m, { conn }) => {
  conn.ongoing = conn.ongoing ? conn.ongoing : {};
  if (m.isBaileys) return;
  if (!conn.ongoing[m.sender]) return;
  if (!m.text) return;
  if (
    isNaN(m.text) ||
    m.text <= 0 ||
    m.text > conn.ongoing[m.sender].data.length
  )
    return;
  let { data } = conn.ongoing[m.sender];
  let pilihan = data[m.text - 1].detail_url;

  let detail = await (await fetch(pilihan)).json();
  let hasil = `*${detail.data.name.toUpperCase()}*\n\n*Sinopsis Anime:* ${detail.data.synopsis}\n\n*Sedang Mendownload video, memerlukan waktu 1 - 5 menit*`;
  conn.reply(m.chat, hasil, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: "TEKAN DISINI UNTUK MENONTON",
        body: "Anime Update",
        mediaType: 1,
        thumbnailUrl: detail.data.thumbnail,
        renderLangerThumbnail: true,
        sourceUrl: detail.data.video_direct_links[1].link,
      },
    },
  });
  delete conn.ongoing[m.sender];
  const html = await (
    await fetch(detail.data.video_embed_links[0].link)
  ).text();
  const urls = [];

  // Regex pattern untuk mencari URL HTTPS
  const regex = /https:\/\/[^'"]+/g;

  // Mencocokkan URL dengan pattern regex dan menyimpannya dalam array
  const matches = html.match(regex);
  if (matches) {
    matches.forEach((match) => {
      urls.push(match);
    });
  }

  let response = await axios({
    url: detail.data.video_direct_links[1].link,
    method: "GET",
    responseType: "stream",
    headers: { referer: "https://www.yourupload.com/" },
  });

  let type = response.headers["content-type"];
  return conn.sendMessage(
    m.chat,
    {
      document: {
        stream: response.data,
      },
      mimetype: type,
      fileName: detail.data.name + "." + type.split("/")[1],
    },
    { quoted: m },
  );
};

handler.help = ["animeupdate"]
handler.tags = ["anime"];
handler.command = ["animeupdate"];

module.exports = handler;