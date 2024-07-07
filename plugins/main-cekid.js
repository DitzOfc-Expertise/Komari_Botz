const {
  proto,
  generateWAMessageFromContent,
} = require("@whiskeysockets/baileys");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(db.data.users[m.sender].sn);
};
handler.help = ["cekid"]
handler.tags = ["main"];
handler.command = ["cekid"];
handler.register = true;

module.exports = handler;
