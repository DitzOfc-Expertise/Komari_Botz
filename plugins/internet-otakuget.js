const fetch = require("node-fetch");
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys");

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} link`, m);
  }
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });
    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            contextInfo: {
              mentionedJid: [m.sender],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: 'OTAKUDESU',
                serverMessageId: -1
              }
            },
            body: proto.Message.InteractiveMessage.Body.create({
              text: 'Click Here To Get Detail Anime'
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'Powered By _Dev. Expertise_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              subtitle: "Result_Search",
              hasMediaAttachment: false
             // ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: conn.waUploadToServer }))
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
              {
              "name": "cta_url",
              "buttonParamsJson": `{"display_text":"Click Here!","url":"${text}","merchant_url":"${text}"}`
              }
              ],
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
}

handler.command = /^(otakuget)$/i;

module.exports = handler;
