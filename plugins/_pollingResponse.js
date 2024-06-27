let handler = (m) => m;
handler.before = async (m, { conn, text, usedPrefix, command, chatUpdate }) => {
  if (m.mtype === "interactiveResponseMessage" && m.quoted.fromMe)
    conn.appendTextMessage(
      m,
      JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id,
      chatUpdate,
    );
  if (m.mtype === "templateButtonReplyMessage" && m.quoted.fromMe)
    conn.appendTextMessage(m, m.msg.selectedId, chatUpdate);
};
module.exports = handler;
