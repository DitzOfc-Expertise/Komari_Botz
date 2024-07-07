let fetch = require("node-fetch");
let util = require("util");
let handler = async (m, { text, usedPrefix, command }) => {
  if (!/^https?:\/\//.test(text))
    throw `*• Example :* ${usedPrefix + command} *[url]*`;
  let _url = new URL(text);
  let url = global.API(
    _url.origin,
    _url.pathname,
    Object.fromEntries(_url.searchParams.entries()),
    "APIKEY",
  );
  let headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };
  let res = await fetch(url, { headers });
  if (res.headers.get("content-length") > 100 * 1024 * 1024 * 1024) {
    delete res;
    throw `Content-Length: ${res.headers.get("content-length")}`;
  }
  if (!/text|json/.test(res.headers.get("content-type")))
    return conn.sendFile(m.chat, url, "file", text, m);
  let txt = await res.buffer();
  try {
    txt = util.format(Func.jsonFormat(txt + ""));
  } catch (e) {
    txt = txt + "";
  } finally {
    m.reply(txt.slice(0, 65536) + "");
  }
};
handler.help = ["fetch", "get"].map((v) => v + " *[url]*");
handler.tags = ["tools"];
handler.command = /^(fetch|get)$/i;

module.exports = handler;
