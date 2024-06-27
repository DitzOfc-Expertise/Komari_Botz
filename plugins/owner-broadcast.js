let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;
  let chats = Object.keys(await conn.chats);
  conn.reply(m.chat, `Sending Broadcast to *[ ${chats.length} ]*`, m);
  for (let id of chats) {
    await sleep(5000);
    conn.reply(
      id,
      `*[ BROADCAST CHAT ]*\n*• FROM :* @${m.sender.split("@")[0]}\n<======================>\n${text}`,
      null,
    );
  }
};
handler.help = ["broadcast", "bc"]
handler.tags = ["owner"];
handler.command = ["broadcast", "bc"];
handler.owner = true;

module.exports = handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
