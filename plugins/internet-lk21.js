const axios = require("axios");
const cheerio = require("cheerio");

class LK21Scraper {
  constructor() {
    this.baseURL = "https://tv2.lk21official.wiki";
  }

  async latest(page = 0) {
    try {
      const response = await axios.request({
        method: "GET",
        baseURL: this.baseURL,
        url: `/latest/page/${page}/`,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      });

      const $ = cheerio.load(response.data);
      const result = $(
        `div#grid-wrapper > div.col-lg-2.col-sm-3.col-xs-4.page-${page}.infscroll-item`,
      )
        .map((_, el) => ({
          title: $(el)
            .find(".mega-item > .grid-header > h1")
            .text()
            .trim()
            .replace("Nonton ", "")
            .replace(" Film Subtitle Indonesia Streaming Movie Download", "")
            .trim(),
          link: $(el).find(".mega-item > .grid-poster > a").attr("href"),
          rating: $(el)
            .find(".mega-item > .grid-poster > .grid-meta > .rating")
            .text()
            .trim(),
          quality: $(el)
            .find(
              ".mega-item > .grid-poster > .grid-meta > .quality.quality-HD",
            )
            .text()
            .trim(),
          duration: $(el)
            .find(".mega-item > .grid-poster > .grid-meta > .duration")
            .text()
            .trim(),
          tags: $(el)
            .find(".mega-item > .grid-action > .grid-categories > a")
            .map((_, e) => $(e).text().trim())
            .get(),
          image:
            "https:" +
            $(el)
              .find(".mega-item > .grid-poster > a > picture > img")
              .attr("src"),
        }))
        .get();

      return {
        total: result.length,
        page: page,
        result: result,
      };
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return null;
    }
  }
}

async function handler(m, { conn, text }) {
  const scraper = new LK21Scraper();
  const result = await scraper.latest((text = 0));
  if (result) {
    const message = result.result
      .map((item) => {
        return `
• Title: ${item.title}
• Link: ${item.link}
• Rating: ${item.rating}
• Quality: ${item.quality}
• Duration: ${item.duration}
• Tags: ${item.tags.join(", ")}
• Image: ${item.image}
            `;
      })
      .join("\n\n");

    conn.reply(m.chat, message, m);
  }
}

handler.command = ["lk21"];
handler.tags = ["internet"];
handler.help = ["lk21"].map((a) => a + " *[get Lk21 info]*");

module.exports = handler;
