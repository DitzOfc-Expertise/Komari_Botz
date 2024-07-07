let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(
    done,
    `https://raw.githubusercontent.com/Aisyah-Aldi/Sound/main/sound${Math.floor(Math.random() * 110)}.mp3`,
  );
};
handler.help = ["sound"].map((a) => a + " *[Random sound DJ]*");
handler.tags = ["fun"];
handler.command = ["sound"];
handler.limit = true;

module.exports = handler;
