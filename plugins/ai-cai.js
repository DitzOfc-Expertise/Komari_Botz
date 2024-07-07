const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.cai = conn.cai ? conn.cai : {};
  if (!text) throw `*• Example:* ${usedPrefix + command} *[on/off]*
*• Example search Chara:* ${usedPrefix + command} search *[characters name]*`
  const keyword = text.split(" ")[0];
  const ditzofc = text.slice(keyword.length + 1);
  if (keyword === "search") {
    if (!ditzofc) throw `*• Example:* ${usedPrefix + command} ${keyword} Hutao`
    m.reply(`_🔍searching data.... *[ ${ditzofc} ]*_`);
    
    let search = await (await fetch(
      `https://api.itsrose.rest/cai/search_characters`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': global.rose,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: ditzofc })
      }
    )).json();

    if (!search.status) {
      return m.reply('Character not found');
    }

    let karakter = search.result.characters.map((a, index) => `*[ ${index + 1}. ${a.name.trim()} ]*
*• Description:* \`${a.description}\`
*• Tags:* ${a.tags.join(', ')}
*• Model Info Prompt:* \`${a.model_info.prompt}\``,
    ).join("\n\n");

    const reply = await conn.reply(m.chat, karakter, m, {
        contextInfo: {
            mentionedJid: [],
            groupMentions: [],
            externalAdReply: {
                title: search.result.characters[0].name,
                body: search.result.characters[0].description,
                thumbnailUrl: "https://characterai.io/i/200/static/" + search.result.characters[0].avatar,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });

    await conn.reply(m.chat, `*[ KETIK ANGKA 1 SAMPAI ${search.result.characters.length} ]*
> • _! Pilih karakter anda dengan mengetik *.cai set (nomor urut)* sesuai dengan pesan diatas_`, reply);
    
    conn.cai[m.sender] = {
      pilih: search.result.characters
    };
  } else if (keyword === "set") {
    if (!conn.cai[m.sender]) throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    if (!conn.cai[m.sender].pilih) throw `*[ KAMU SUDAH PUNYA CHARACTER ]*
> _ketik *.cai search* untuk menganti characters_`;
    if (!ditzofc) throw `*• Example:* ${usedPrefix + command} ${keyword} 1`;
    
    let pilihan = conn.cai[m.sender].pilih[ditzofc - 1];
    let kk = '```Berhasil Memilih Data:```' + ` ${pilihan.name}`;
    m.reply(kk);
    
    conn.cai[m.sender] = {
      isChats: false,
      id: pilihan.character_id,
      name: pilihan.name
    };
  } else if (keyword === "on") {
    if (!conn.cai[m.sender]) throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    conn.cai[m.sender].isChats = true;
    m.reply("_*[ ✓ ] Room chat berhasil dibuat_*");
  } else if (keyword === "off") {
    if (!conn.cai[m.sender]) throw `*[ KAMU BELUM MENCARI CHARACTER ]*
> _ketik *.cai search* untuk mencari characters favorit mu_`;
    conn.cai[m.sender].isChats = false;
    m.reply("_*[ ✓ ] Berhasil keluar dari Room chat_*");
  }
};

handler.before = async (m, { conn, usedPrefix }) => {
  conn.cai = conn.cai ? conn.cai : {};
  if (!m.text) return;
  if (m.text.match(global.prefix)) return;
  if (!conn.cai[m.sender]) return;
  if (!conn.cai[m.sender].isChats) return;

  let ditzofc = await m.reply('```....```');
  let chat = await (await fetch(
    `https://api.itsrose.rest/cai/chat`,
    {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': global.rose,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        character_id: conn.cai[m.sender].id,
        message: m.text,
        enable_nsfw: false,
        model: 'rs_v8_72b'
      })
    }
  )).json();

  await conn.sendMessage(m.chat, { text: `${chat.result.message}`, edit: ditzofc });
};

handler.help = ["cai *<text>*"];
handler.tags = ["ai"];
handler.command = ["cai"];
module.exports = handler;
