let pajak = 0.02;
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let dapat = Math.floor(Math.random() * 100000);
  let nomors = m.sender;
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw "Tag salah satu lah";
  if (typeof db.data.users[who] == "undefined")
    throw "Pengguna tidak ada didalam database";

  let __timers = new Date() - global.db.data.users[m.sender].lastrob;
  let _timers = 3600000 - __timers;
  let timers = clockString(_timers);
  let users = global.db.data.users;

  if (new Date() - global.db.data.users[m.sender].lastrob > 3600000) {
    if (10000 > users[who].money) throw "Target Gaada Uang, Kismin dia 💸";

    // Hitung pajak
    let pajak = Math.floor(dapat * 0.02);
    // Hitung total yang akan diterima
    let totalDapat = dapat - pajak;

    users[who].money -= totalDapat * 1;
    users[m.sender].money += totalDapat * 1;
    global.db.data.users[m.sender].lastrob = new Date() * 1;
    conn.reply(
      m.chat,
      `💣 Berhasil Merampok Money Target Sebesar ${dapat} 💰\n💼 Anda membayar pajak sebesar ${pajak} 💸\n💵 Total yang diterima: ${totalDapat} 💵`,
      m,
    );
  } else
    conn.reply(
      m.chat,
      `Anda Sudah merampok dan berhasil sembunyi , tunggu ${timers} untuk merampok lagi ⏳`,
      m,
    );
};

handler.help = ["merampok"];
handler.tags = ["rpg"];
handler.command = ["merampok"];
handler.limit = true;
handler.group = true;

module.exports = handler;

// Fungsi untuk memilih secara acak dari daftar
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Fungsi untuk mengubah waktu menjadi format jam:menit:detik
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
