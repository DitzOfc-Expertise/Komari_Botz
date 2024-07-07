const moment = require("moment-timezone");
const fakeUserAgent = require("fake-useragent");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");
const vm = require("node:vm");
const axios = require("axios");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const got = require("got");
const qs = require("qs");

async function ttSearch(query) {
  return new Promise(async (resolve, reject) => {
    axios("https://tikwm.com/api/feed/search", {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: {
        keywords: query,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      },
      method: "POST",
    }).then((res) => {
      resolve(res.data.data);
    });
  });
}
async function random_mail() {
  const link =
    "https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D";

  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    let email = data["data"]["introduceSession"]["addresses"][0]["address"];
    let id_ = data["data"]["introduceSession"]["id"];
    let time = data["data"]["introduceSession"]["expiresAt"];

    return [email, id_, time];
  } catch (error) {
    console.log(error);
  }
}
async function downloadCapcut(Url) {
  try {
    const token = Url.match(/\d+/)[0];
    const response = await fetch(
      `https://ssscapcut.com/api/download/${token}`,
      {
        method: "GET",
        headers: {
          Accept: "/",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
          "X-Requested-With": "acr.browser.barebones",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: "https://ssscapcut.com/",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          Cookie:
            "sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function capcutsearch(s) {
  try {
    const response = await got("https://capcut-templates.com/?s=" + s);
    const html = response.body;
    const $ = cheerio.load(html);
    const elements = $(
      "main#main div.ct-container section div.entries article",
    );

    const detailPromises = elements
      .map(async (index, element) => {
        const link = $(element).find("a.ct-image-container").attr("href");
        const detail = await detailTemplates(link);
        const imageSrc = $(element).find("img").attr("src");
        const title = $(element).find("h2.entry-title a").text().trim();

        return {
          id: $(element).attr("id"),
          link,
          detail,
          imageSrc,
          title,
        };
      })
      .get();

    return Promise.all(detailPromises);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function capcutdetail(link) {
  try {
    const response = await got(link);
    const html = response.body;
    const $ = cheerio.load(html);
    const elements = $("main#main div.ct-container-full article");

    return elements
      .map((index, element) => ({
        id: $(element).attr("id"),
        time: $("main#main").find("time.ct-meta-element-date").text().trim(),
        template: $(element)
          .find(".wp-block-buttons .wp-block-button a")
          .attr("data-template-id"),
        link: $(element).find("a.wp-block-button__link").attr("href"),
        imageSrc: $(element).find("video").attr("poster"),
        title: $(element).find("h2").text().trim(),
        videoSrc: $(element).find("video source").attr("src"),
        description: $(element).find(".entry-content p").text().trim(),
      }))
      .get();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function aigpt(prompt) {
  try {
    const response = await axios.get(
      "https://tools.revesery.com/ai/ai.php?query=" + prompt,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
        },
      },
    );
    const res = response.data;
    const result = res.result;
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function githubstalk(user) {
  return new Promise((resolve, reject) => {
    axios.get("https://api.github.com/users/" + user).then(({ data }) => {
      let hasil = {
        username: data.login,
        nickname: data.name,
        bio: data.bio,
        id: data.id,
        nodeId: data.node_id,
        profile_pic: data.avatar_url,
        url: data.html_url,
        type: data.type,
        admin: data.site_admin,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        public_repo: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        ceated_at: data.created_at,
        updated_at: data.updated_at,
      };
      return hasil;
    });
  });
}
async function npmstalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/" + packageName);
  let versions = stalk.data.versions;
  let allver = Object.keys(versions);
  let verLatest = allver[allver.length - 1];
  let verPublish = allver[0];
  let packageLatest = versions[verLatest];
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest],
  };
}
async function savefrom() {
  let body = new URLSearchParams({
    sf_url: encodeURI(arguments[0]),
    sf_submit: "",
    new: 2,
    lang: "id",
    app: "",
    country: "id",
    os: "Windows",
    browser: "Chrome",
    channel: " main",
    "sf-nomad": 1,
  });
  let { data } = await axios({
    url: "https://worker.sf-tools.com/savefrom.php",
    method: "POST",
    data: body,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://id.savefrom.net",
      referer: "https://id.savefrom.net/",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
    },
  });
  let exec = '[]["filter"]["constructor"](b).call(a);';
  data = data.replace(
    exec,
    `\ntry {\ni++;\nif (i === 2) scriptResult = ${exec.split(".call")[0]}.toString();\nelse (\n${exec.replace(/;/, "")}\n);\n} catch {}`,
  );
  let context = {
    scriptResult: "",
    i: 0,
  };
  vm.createContext(context);
  new vm.Script(data).runInContext(context);
  return JSON.parse(
    context.scriptResult
      .split("window.parent.sf.videoResult.show(")?.[1]
      .split(");")?.[0],
  );
}
async function wallpaperhd(chara) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://wall.alphacoders.com/search.php?search=" +
          chara +
          "&filter=4K+Ultra+HD",
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("div.boxgrid > a > picture").each(function (a, b) {
          result.push($(b).find("img").attr("src").replace("thumbbig-", ""));
        });
        resolve(result);
      })
      .catch(reject);
  });
}
function twitter(link) {
  return new Promise((resolve, reject) => {
    let config = {
      URL: link,
    };
    axios
      .post("https://twdown.net/download.php", qs.stringify(config), {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1",
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        resolve({
          desc: $("div:nth-child(1) > div:nth-child(2) > p").text().trim(),
          thumb: $("div:nth-child(1) > img").attr("src"),
          video_sd: $("tr:nth-child(2) > td:nth-child(4) > a").attr("href"),
          video_hd: $("tbody > tr:nth-child(1) > td:nth-child(4) > a").attr(
            "href",
          ),
          audio:
            "https://twdown.net/" +
            $(
              "body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a",
            ).attr("href"),
        });
      })
      .catch(reject);
  });
}
async function jadianime(url) {
  const { data } = await axios.post(
    "https://tools.revesery.com/image-anime/convert.php",
    new URLSearchParams(
      Object.entries({
        "image-url": url,
      }),
    ),
  );
  const buffer = Buffer.from(data.image.split(",")[1], "base64");
  return conn.sendFile(m.chat, buffer, "", wm, m);
}
async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    const payload = new URLSearchParams(
      Object.entries({
        url: url,
        host: "instagram",
      }),
    );
    await axios
      .request({
        method: "POST",
        baseURL: "https://saveinsta.io/core/ajax.php",
        data: payload,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
      })
      .then((response) => {
        const $ = cheerio.load(response.data);
        const mediaURL = $(
          "div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom",
        )
          .map((_, el) => {
            return (
              "https://saveinsta.io/" +
              $(el).find("div.col-md-8.mx-auto > a").attr("href")
            );
          })
          .get();
        const res = {
          status: 200,
          media: mediaURL,
        };
        resolve(res);
      })
      .catch((e) => {
        console.log(e);
        throw {
          status: 400,
          message: "error",
        };
      });
  });
}
async function cai(query, character) {
  try {
    const response = await axios.post(
      "https://boredhumans.com/api_celeb_chat.php",
      `message=${query}&intro=${character}&name=${character}`,
      {
        headers: {
          "User-Agent": "Googlebot-News",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
function parseResult(data) {
  let arr = [];
  for (let x of data)
    arr.push({
      id: x.id,
      title: x.title,
      language: x.lang,
      pages: x.num_pages,
      cover:
        x.cover.t.replace(/a.kontol|b.kontol/, "c.kontol") ||
        x.cover.replace(/a.kontol|b.kontol/, "c.kontol"),
    });
  return arr;
}

async function nhentaihome(type = "latest") {
  type = { latest: "all", popular: "popular" }[type];
  await axios
    .get("https://same.yui.pw/api/v4/home")
    .then((res) => parseResult(res.data[type]));
}
async function nhentaisearch(query, sort, page) {
  await axios
    .get(`https://same.yui.pw/api/v4/search/${query}/${sort}/${page}/`)
    .then((res) => parseResult(res.data.result));
}
async function nhentaigetDoujin(id) {
  await axios
    .get(`https://same.yui.pw/api/v4/book/${+id}`)
    .then((res) => res.data);
}
async function nhentaigetRelated(id) {
  await axios
    .get(`https://same.yui.pw/api/v4/book/${+id}/related/`)
    .then((res) => parseResult(res.data.books));
}
async function shortlink(url) {
  isurl = /https?:\/\//.test(url);
  return isurl
    ? (
        await require("axios").get(
          "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url),
        )
      ).data
    : "";
}
async function Wikipedia(query) {
  const response = await fetch(
    `https://id.m.wikipedia.org/w/index.php?search=${query}`,
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const contentArray = [];
  $("div.mw-parser-output p").each((index, element) => {
    contentArray.push($(element).text().trim());
  });

  const infoTable = [];
  $("table.infobox tr").each((index, element) => {
    const label = $(element).find("th.infobox-label").text().trim();
    const value =
      $(element).find("td.infobox-data").text().trim() ||
      $(element).find("td.infobox-data a").text().trim();
    if (label && value) {
      infoTable.push(`${label}: ${value}`);
    }
  });

  const data = {
    title: $("title").text().trim(),
    content: contentArray.join("\n"), // Menggabungkan konten menjadi satu string dengan newline separator
    image:
      "https:" +
      ($("#mw-content-text img").attr("src") ||
        "//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png"),
    infoTable: infoTable.join("\n"), // Menggabungkan infoTable menjadi satu string dengan newline separator
  };

  return data;
}
async function cariresep(query) {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://resepkoki.id/?s=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const link = [];
        const judul = [];
        const upload_date = [];
        const format = [];
        const thumb = [];
        $(
          "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a",
        ).each(function (a, b) {
          link.push($(b).attr("href"));
        });
        $(
          "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a",
        ).each(function (c, d) {
          let jud = $(d).text();
          judul.push(jud);
        });
        for (let i = 0; i < link.length; i++) {
          format.push({
            judul: judul[i],
            link: link[i],
          });
        }
        const result = {
          creator: "Bang syaii",
          data: format.filter((v) =>
            v.link.startsWith("https://resepkoki.id/resep"),
          ),
        };
        resolve(result);
      })
      .catch(reject);
  });
}

async function detailresep(query) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const abahan = [];
        const atakaran = [];
        const atahap = [];
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name",
        ).each(function (a, b) {
          let bh = $(b).text();
          abahan.push(bh);
        });
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount",
        ).each(function (c, d) {
          let uk = $(d).text();
          atakaran.push(uk);
        });
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p",
        ).each(function (e, f) {
          let th = $(f).text();
          atahap.push(th);
        });
        const judul = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1",
        ).text();
        const waktu = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span",
        ).text();
        const hasil = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span",
        )
          .text()
          .split(": ")[1];
        const level = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span",
        )
          .text()
          .split(": ")[1];
        const thumb = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img",
        ).attr("src");
        let tbahan = "bahan\n";
        for (let i = 0; i < abahan.length; i++) {
          tbahan += abahan[i] + " " + atakaran[i] + "\n";
        }
        let ttahap = "tahap\n";
        for (let i = 0; i < atahap.length; i++) {
          ttahap += atahap[i] + "\n\n";
        }
        const tahap = ttahap;
        const bahan = tbahan;
        const result = {
          creator: "Bang syaii",
          data: {
            judul: judul,
            waktu_masak: waktu,
            hasil: hasil,
            tingkat_kesulitan: level,
            thumb: thumb,
            bahan: bahan.split("bahan\n")[1],
            langkah_langkah: tahap.split("tahap\n")[1],
          },
        };
        resolve(result);
      })
      .catch(reject);
  });
}
async function BingChat(sistem, prompt) {
  let response = await (
    await fetch("https://copilot.github1s.tk/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "dummy",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "balanced",
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content: sistem,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })
  ).json();
  return response.choices[0].delta.content;
}
function fbdl(link) {
  return new Promise((resolve, reject) => {
    let config = {
      url: link,
    };
    axios("https://www.getfvid.com/downloader", {
      method: "POST",
      data: new URLSearchParams(Object.entries(config)),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie:
          "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss",
      },
    })
      .then(async ({ data }) => {
        const $ = cheerio.load(data);
        resolve({
          Normal_video: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a",
          ).attr("href"),
          HD: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a",
          ).attr("href"),
          audio: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a",
          ).attr("href"),
        });
      })
      .catch(reject);
  });
}
async function gore() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 228);
    axios.get("https://seegore.com/gore/page/" + page).then((res) => {
      const $ = cheerio.load(res.data);
      const link = [];
      $("ul > li > article").each(function (a, b) {
        link.push({
          title: $(b).find("div.content > header > h2").text(),
          link: $(b).find("div.post-thumbnail > a").attr("href"),
          thumb: $(b).find("div.post-thumbnail > a > div > img").attr("src"),
          view: $(b)
            .find(
              "div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-views",
            )
            .text(),
          vote: $(b)
            .find(
              "div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-votes",
            )
            .text(),
          tag: $(b)
            .find("div.content > header > div > div.bb-cat-links")
            .text(),
          comment: $(b)
            .find("div.content > header > div > div.post-meta.bb-post-meta > a")
            .text(),
        });
      });
      const random = link[Math.floor(Math.random() * link.length)];
      axios.get(random.link).then((resu) => {
        const $$ = cheerio.load(resu.data);
        const hasel = {};
        hasel.title = random.title;
        hasel.source = random.link;
        hasel.thumb = random.thumb;
        hasel.tag = $$("div.site-main > div > header > div > div > p").text();
        hasel.upload = $$("div.site-main")
          .find("span.auth-posted-on > time:nth-child(2)")
          .text();
        hasel.author = $$("div.site-main")
          .find("span.auth-name.mf-hide > a")
          .text();
        hasel.comment = random.comment;
        hasel.vote = random.vote;
        hasel.view = $$("div.site-main")
          .find(
            "span.post-meta-item.post-views.s-post-views.size-lg > span.count",
          )
          .text();
        hasel.video1 = $$("div.site-main").find("video > source").attr("src");
        hasel.video2 = $$("div.site-main").find("video > a").attr("href");
        resolve(hasel);
      });
    });
  });
}

async function HariLibur() {
  const { data } = await axios.get("https://www.liburnasional.com/");
  let libnas_content = [];
  let $ = cheerio.load(data);
  let result = {
    nextLibur:
      "Hari libur" +
      $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
    libnas_content,
  };
  $("tbody > tr > td > span > div").each(function (a, b) {
    summary = $(b).find("span > strong > a").text();
    days = $(b).find("div.libnas-calendar-holiday-weekday").text();
    dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text();
    libnas_content.push({ summary, days, dateMonth });
  });
  return result;
}
class Drakor {
  search = async (query) => {
    try {
      const response = await fetch(
        "https://drakorasia.us?s=" + query + "&post_type=post",
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      const extractedData = $("#post.archive")
        .map((index, element) => ({
          title: $(element).find("h2 a").text().trim(),
          link: $(element).find("h2 a").attr("href"),
          image: $(element).find("img").attr("src"),
          categories: $(element)
            .find('.genrenya span[rel="tag"]')
            .map((index, el) => $(el).text())
            .get(),
          year: $(element).find('.category a[rel="tag"]').text(),
          episodes: $(element)
            .find(".category")
            .contents()
            .filter((index, el) => el.nodeType === 3)
            .text()
            .trim(),
        }))
        .get();
      return extractedData;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };
  download = async (url) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const genres = $('.genrenya span[rel="tag"]')
        .map(function (_, el) {
          return $(el).text().trim();
        })
        .get();
      const resolutions = $("thead th")
        .filter(function (_, el) {
          return $(el).text().includes("Download");
        })
        .map(function (_, el) {
          return $(el).text().trim().replace("Download ", "").toLowerCase();
        })
        .get();
      return {
        title: $("h2 span.border-b-4").text().trim(),
        synopsis: $("#synopsis p.caps strong").text().trim(),
        rating: $(".wpd-rating-value .wpdrv").text(),
        genres,
        downloadInfo: $("#content-post table.mdl-data-table tbody tr")
          .map(function (_, el) {
            const episode = $(el).find("td:first-child").text().trim();
            const episodeInfo = Object.fromEntries(
              resolutions.map(function (resolution) {
                const columnIndex = $(
                  'thead th:contains("Download ' + resolution + '")',
                ).index();
                const resolutionColumn = $(el).find(
                  "td:eq(" + columnIndex + ")",
                );
                const downloadLinks = resolutionColumn
                  .find("a")
                  .map(function (_, a) {
                    const link = $(a).attr("href");
                    const platform = $(a).text().trim();
                    return {
                      platform,
                      link,
                    };
                  })
                  .get();
                return [resolution, downloadLinks];
              }),
            );
            return {
              episode,
              episodeInfo,
            };
          })
          .get(),
      };
    } catch (error) {
      console.error("Error:", error);
      return {};
    }
  };
}

async function tiktokTts(text, model) {
  try {
    const modelVoice = model ? model : "en_us_001";
    const { status, data } = await axios.post(
      "https://tiktok-tts.weilnet.workers.dev/api/generation",
      {
        text: text,
        voice: modelVoice,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

async function ttsModel() {
  try {
    const response = await axios.get("https://tiktokvoicegenerator.com");
    const $ = cheerio.load(response.data);

    return $('select#voice option[value*="_"]')
      .get()
      .map((option) => ({
        title: $(option).text().trim(),
        id: $(option).attr("value"),
      }));
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return [];
  }
}

async function findSongs(text) {
  try {
    const { data } = await axios.get(
      "https://songsear.ch/q/" + encodeURIComponent(text),
    );
    const $ = cheerio.load(data);
    const result = {
      title:
        $("div.results > div:nth-child(1) > .head > h3 > b").text() +
        " - " +
        $("div.results > div:nth-child(1) > .head > h2 > a").text(),
      album: $("div.results > div:nth-child(1) > .head > p").text(),
      number: $("div.results > div:nth-child(1) > .head > a")
        .attr("href")
        .split("/")[4],
      thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src"),
    };

    const { data: lyricData } = await axios.get(
      `https://songsear.ch/api/song/${result.number}?text_only=true`,
    );
    const lyrics = lyricData.song.text_html
      .replace(/<br\/>/g, "\n")
      .replace(/&#x27;/g, "'");

    return {
      status: true,
      title: result.title,
      album: result.album,
      thumb: result.thumb,
      lyrics: lyrics,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: "Unknown error occurred",
    };
  }
}
module.exports = {
  ttSearch,
  random_mail,
  githubstalk,
  aigpt,
  npmstalk,
  Wikipedia,
  cariresep,
  detailresep,
  gore,
  HariLibur,
  Drakor,
  tiktokTts,
  ttsModel,
  findSongs,
};

let fs = require("fs");
let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update scrape"));
  delete require.cache[file];
  require(file);
});
