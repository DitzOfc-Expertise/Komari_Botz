let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.otakudesu = conn.otakudesu ? conn.otakudesu : {};
  if (!text)
    throw `*] otakudesu EXAMPLE ]*
> *• Example :* ${usedPrefix + command} search *query*
> *• Example :* ${usedPrefix + command} detail *url/number*
> *• Example :* ${usedPrefix + command} latest *get latest*`;
  const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
  if (keyword === "search") {
    if (!data) throw ` *• Example :* ${usedPrefix + command} search Jujutsu Kaisen*`;
    const search = await Func.fetchJson(
      "https://akane.my.id/api/otakudesu/search?query=" + data,
    );
    if (!search.data) throw search.msg;
    let list = search.data
      .map(
        (a, i) => `*${i + 1}* ${a.title}
*• Genre :* ${a.genres} 
*• Status :* ${a.status}
*• Rating :* ${a.rating}
*• Url :* ${a.url}`,
      )
      .join("\n\n");
    let reply = await conn.sendFile(
      m.chat,
      search.data[0].thumbnail,
      null,
      `*[ ${command.toUpperCase()} SEARCH ]*\n` + list,
      m,
    );

    await conn.reply(
      m.chat,
      `*INPUT 1 - ${search.data.length}*\n> • _type ${usedPrefix + command} detail *number* to get detail_`,
      reply,
    );
    conn.otakudesu[m.sender] = search;
  } else if (keyword === "detail") {
    if (!data)
      throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
    if (await Func.isUrl(data)) {
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/otakudesu/detail?url=" + data,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ ${command.toUpperCase()} DETAIL ]*
*• Title Anime :* ${detail.data.judul}
*• Title Japanese :* ${detail.data.japanese}
*• Release Date :* ${detail.data.tanggal_rilis}
*• Genre :* ${detail.data.genre}
*• Skor :* ${detail.data.skor}
*• Produser :* ${detail.data.produser} *[ ${detail.data.studio} ]*
*• Type :* ${detail.data.type}
*• Status :* ${detail.data.status}
*• Total Episode :* ${detail.data.total_episode}
*• Duration :* ${detail.data.durasi}
*• Batch :* ${detail.data.batch}
*• Sinopsis :* ${detail.data.sinopsis}

*[ EPISODE RELEASE ]*
${detail.data.episode
  .map(
    (a, i) => `*${i + 1}.* ${a.judul}
*• Upload :* ${a.upload}
*• Url :* ${a.link}`,
  )
  .join("\n\n")}`;
      m.reply(cap);
    } else {
      if (isNaN(data))
        throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
      let link = conn.otakudesu[m.sender].data[data - 1].link;
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/otakudesu/detail?url=" + link,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ ${command.toUpperCase()} DETAIL ]*
*• Title Anime :* ${detail.data.judul}
*• Title Japanese :* ${detail.data.japanese}
*• Release Date :* ${detail.data.tanggal_rilis}
*• Genre :* ${detail.data.genre}
*• Skor :* ${detail.data.skor}
*• Produser :* ${detail.data.produser} *[ ${detail.data.studio} ]*
*• Type :* ${detail.data.type}
*• Status :* ${detail.data.status}
*• Total Episode :* ${detail.data.total_episode}
*• Duration :* ${detail.data.durasi}
*• Batch :* ${detail.data.batch}
*• Sinopsis :* ${detail.data.sinopsis}

*[ EPISODE RELEASE ]*
${detail.data.episode
  .map(
    (a, i) => `*${i + 1}.* ${a.judul}
*• Upload :* ${a.upload}
*• Url :* ${a.link}`,
  )
  .join("\n\n")}`;
      m.reply(cap);
    }
  } else if (keyword === "latest") {
    let list = await Func.fetchJson("https://akane.my.id/api/otakudesu/latest");
    m.reply(
      list.data
        .map(
          (a, i) => `*${i + 1}.* ${a.title.toUpperCase()}
*• Day :* ${a.day}
*• Date :* ${a.date}
*• Url :* ${a.link}`,
        )
        .join("\n\n"),
      list.data[0].thumbnail,
    );
  }
};
handler.help = ["otakudesu"].map((a) => a + " *[otakudesu info]*");
handler.tags = ["anime"];
handler.command = ["otakudesu"];

module.exports = handler;
