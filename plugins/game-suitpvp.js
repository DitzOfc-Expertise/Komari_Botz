let timeout = 60000;
let poin = 50000;
let poin_lose = -2000;
let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit ? conn.suit : {};
  if (
    Object.values(conn.suit).find(
      (room) =>
        room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender),
    )
  )
    throw "Finish your previous suit";
  if (!m.mentionedJid[0])
    return m.reply(
      `_Who do you want to suit?_\nTag the person.. Example\n\n${usedPrefix}suit @${owner[1]}`,
      m.chat,
      { contextInfo: { mentionedJid: [owner[1] + "@s.whatsapp.net"] } },
    );
  if (
    Object.values(conn.suit).find(
      (room) =>
        room.id.startsWith("suit") &&
        [room.p, room.p2].includes(m.mentionedJid[0]),
    )
  )
    throw `The person you are challenging is playing suit with someone else :(`;
  let id = "suit_" + new Date() * 1;
  let caption = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} challenges @${m.mentionedJid[0].split`@`[0]} to a game of suits

Silahkan @${m.mentionedJid[0].split`@`[0]} 
`.trim();
  let footer = `Type "terima/ok/gas" to start suit\nType "tolak/gabisa/nanti" to cancel`;
  conn.suit[id] = {
    chat: await conn.reply(m.chat, caption + footer, m, {
      contextInfo: { mentionedJid: conn.parseMention(caption) },
    }),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: "wait",
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Suit time is up_`, m);
      delete conn.suit[id];
    }, timeout),
    poin,
    poin_lose,
    timeout,
  };
};
handler.tags = ["game"];
handler.help = ["suitpvp"];
handler.command = ["suitpvp"];
handler.limit = false;
handler.group = true;

module.exports = handler;
