let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === "self") {
    if (opts["self"]) throw "*[ ! ] self has been activated previously*";
    opts["self"] = true;
    m.reply("[ ✓ ] self activated successfully");
  } else if (command === "public") {
    if (!opts["self"]) throw "*[ ! ] public has been activated previously*";
    opts["self"] = false;
    m.reply("[ ✓ ] public activated successfully");
  }
};
handler.help = ["self", "public"]
handler.tags = ["owner"];
handler.command = ["self", "public"];
handler.owner = true;

module.exports = handler;
