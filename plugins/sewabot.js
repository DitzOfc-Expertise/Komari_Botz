const fetch = require("node-fetch");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

const handler = async (m, { conn }) => {
  let pp = "https://telegra.ph/file/d126e555f86e089f45787.jpg";
  /*try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
  } catch (e) {
  }*/

  const wm = "Your welcome message";

  const msg = await generateWAMessageFromContent(
    m.chat,
    {
      locationMessage: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: "🔖𝗦𝗘𝗪𝗔 𝗕𝗢𝗧",
        address: "tekan gambar dan anda akan diarahkan ke katalog",
        url: "https://wa.me/p/9874349235938613/6283842839555",
        isLive: true,
        accuracyInMeters: 0,
        speedInMps: 0,
        degreesClockwiseFromMagneticNorth: 2,
        comment: "",
        jpegThumbnail: await (await fetch(pp)).buffer(),
      },
    },
    { quoted: m },
  );

  return conn.relayMessage(m.chat, msg.message, {
    contextInfo: {
      externalAdReply: {
        title: "A K I R A A\nKnowlage Bot WhatsApp",
        body: wm,
        thumbnailUrl: pp,
        sourceUrl: "https://アキラ.site/",
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  });
};

handler.help = ["sewabot"];
handler.tags = ["main"];
handler.command = /^sewabot$/;
handler.owner = false;
module.exports = handler;
