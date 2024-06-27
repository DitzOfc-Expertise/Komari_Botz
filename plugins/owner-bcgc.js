let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) throw `*Example :* ${usedPrefix + command} Ready open bo`;
  let groups = Object.entries(conn.chats)
    .filter(
      ([jid, chat]) =>
        jid.endsWith("@g.us") &&
        chat.isChats &&
        !chat.metadata?.read_only &&
        !chat.metadata?.announce,
    )
    .map((v) => v[0]);
  conn.reply(m.chat, `Sending Broadcast to Group : *[ ${groups.length} ]*`, m);
  for (let id of groups) {
    let participantIds = participants.map((a) => a.id);
    await conn
      .sendMessage(
        id,
        {
          text: `*[ BROADCAST CHAT ]*\n*• FROM :* @${m.sender.split("@")[0]}\n<=========================>\n${text}`,
          mentions: [m.sender],
        },
        { quoted: fkontak },
      )
      .catch((_) => _);
  }
};

handler.help = ["bcgc"]
handler.tags = ["owner"];
handler.command = ["bcgc"];
handler.owner = true;
module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = (length) =>
  require("crypto")
    .randomBytes(Math.ceil(length * 0.5))
    .toString("hex")
    .slice(0, length);
