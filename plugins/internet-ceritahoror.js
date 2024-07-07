const cheerio = require("cheerio");
const axios = require("axios");

let handler = async (m, { conn }) => {
  let res = await ceritahantu();
  let hasil = res.map((v) => {
    return `• Title: ${v.title}
• Snippet: ${v.snippet}
• Image: ${v.image}
• URL: ${v.url}
    `;
  });
  m.reply(hasil.join("\n"), res[0].image);
};

handler.help = ["ceritahantu", "ceritahoror"].map(
  (a) => a + " *[get cerita horor]*",
);
handler.tags = ["internet"];
handler.command = ["ceritahantu", "ceritahoror"];
handler.limit = true;

module.exports = handler;

async function ceritahantu() {
  const response = await axios.get(
    "https://cerita-hantu-nyata.blogspot.com/search?q=Kentang&m=1",
  );
  const $ = cheerio.load(response.data);

  const popularPosts = [];

  $(".item-content").each((index, element) => {
    const post = {};
    post.title = $(element).find(".item-title a").text();
    post.snippet = $(element).find(".item-snippet").text().trim();
    post.image = $(element).find(".item-thumbnail img").attr("src");
    post.url = $(element).find(".item-title a").attr("href");
    popularPosts.push(post);
  });

  return popularPosts;
}
