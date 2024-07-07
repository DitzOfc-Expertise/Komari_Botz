let handler = (m) => m;
handler.before = async (
  m,
  { conn, text, usedPrefix, command, isOwner, chatUpdate },
) => {
  if (m.isBaileys) return;
  if (!m.message) return;
  if (!m.msg.fileSha256) return;
  const stickerHash = await m.msg.fileSha256.toString("base64");
  if (!(stickerHash in global.db.data.sticker)) return;
  const { message } = db.data.sticker[stickerHash];
  conn.appendTextMessage(m, message, chatUpdate);
};

module.exports = handler;
