let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.oploverz = conn.oploverz ? conn.oploverz : {};
  if (!text)
    throw `*] OPLOVERZ EXAMPLE ]*
> *• Example :* ${usedPrefix + command} search *query*
> *• Example :* ${usedPrefix + command} detail *url/number*
> *• Example :* ${usedPrefix + command} latest *get latest*`;
  const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
  if (keyword === "search") {
    if (!data) throw ` *• Example :* ${usedPrefix + command} search *Jujur Kasian*`;
    const search = await Func.fetchJson(
      "https://akane.my.id/api/oploverz/search?query=" + data,
    );
    if (!search.data) throw search.msg;
    let list = search.data
      .map(
        (a, i) => `*${i + 1}* ${a.title}
      • *Status :* ${a.status}
*• Url :* ${a.url}`,
      )
      .join("\n\n");
    let reply = await conn.reply(
      m.chat,
      `*${data.toUpperCase()} SEARCH*\n` + list,
      m,
    );

    await conn.reply(
      m.chat,
      `*INPUT 1 - ${search.data.length}*\n> • _type ${usedPrefix + command} detail *number* to get detail_`,
      reply,
    );
    conn.oploverz[m.sender] = search;
  } else if (keyword === "detail") {
    if (!data)
      throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
    if (await Func.isUrl(data)) {
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/oploverz/detail?url=" + data,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ OPLOVERZ DETAIL ]*
*• Title :* ${detail.data.title}
*• Type :* ${detail.data.type}
*• Status  :* ${detail.data.status}
*• Duration :* ${detail.data.duration}
*• Url :* ${detail.data.url}
*• Sinopsis :* ${detail.data.synopsis}`;
      m.reply(cap);
    } else {
      if (isNaN(data))
        throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
      let link = conn.oploverz[m.sender].data[data - 1].url;
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/oploverz/detail?url=" + link,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ OPLOVERZ DETAIL ]*
*• Title :* ${detail.data.title}
*• Type :* ${detail.data.type}
*• Status  :* ${detail.data.status}
*• Duration :* ${detail.data.duration}
*• Url :* ${detail.data.url}
*• Sinopsis :* ${detail.data.synopsis}`;
      m.reply(cap);
    }
  } else if (keyword === "latest") {
    let list = await Func.fetchJson("https://akane.my.id/api/oploverz/latest");
    m.reply(
      list.data
        .map(
          (a, i) => `*${i + 1}.* ${a.title.toUpperCase()}
*• Episode :* ${a.episode}
*• Url :* ${a.url}`,
        )
        .join("\n\n"),
    );
  }
};
handler.help = ["oploverz"].map((a) => a + " *[Oploverz info]*");
handler.tags = ["anime"];
handler.command = ["oploverz"];

module.exports = handler;
