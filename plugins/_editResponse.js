let handler = (m) => m;
handler.all = async (m, { chatUpdate }) => {
  if (m.isBaileys) return;
  if (!m.message) return;
  if (!m.message?.editedMessage) return;
  let hash = {
    text:
      m.message.editedMessage.message.protocolMessage.editedMessage
        .extendedTextMessage.text ||
      m.message.editedMessage.message.protocolMessage.editedMessage
        .conversation ||
      null,
    mentionedJid: [m.sender] || [],
  };
  let { text, mentionedJid } = hash;
  conn.appendTextMessage(m, text, chatUpdate);
};

module.exports = handler;
