let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[number,duration]*`;
  let [Target, duration] = text.split(",");
  if (!Target) return;
  let number = await no(Target);
  const user = db.data.users[number + "@s.whatsapp.net"];
  if (duration) {
    let milidetikDalamHari = 24 * 60 * 60 * 1000;
    let angka = duration;
    let hasil = angka * milidetikDalamHari;
    let { key } = await conn.sendMessage(
      m.chat,
      { text: "memverifikasi data pengguna..." },
      { quoted: m },
    );
    if (!user.registered)
      return conn.sendMessage(
        m.chat,
        { text: "Pengguna tidak terverifikasi", edit: key },
        { quoted: m },
      );
    if (user.banned)
      return conn.sendMessage(
        m.chat,
        { text: "Pengguna telah terbanned", edit: key },
        { quoted: m },
      );
    user.premium = true;
    user.premiumDate = hasil;
    await conn.sendMessage(
      m.chat,
      {
        text: `Verifikasi Selesai
Username: ${user.name}
Age: ${user.age}
Premium: ${user.premium ? "✅" : "❎"}
Expired: ${duration} Day ${Func.toDate(user.premiumDate)}`,
        edit: key,
      },
      { quoted: m },
    );
    await conn.sendMessage(
      number + "@s.whatsapp.net",
      {
        text: `Nomor kamu telah di tambahkan dalam Daftar premium

*Username:* ${user.name}
*Age:* ${user.age}
*Premium:* ${user.premium ? "✅" : "❎"}
*Expired:* ${duration} *Day* *[${Func.toDate(user.premiumDate)}]*

*✅ Thank you for ordering premium on ${namebot}, enjoy exclusive features that can only be accessed by premium users with unlimited limits*`,
      },
      { quoted: m },
    );
  } else {
    let { key } = await conn.sendMessage(
      m.chat,
      { text: "Memverifikasi data pengguna..." },
      { quoted: m },
    );
    if (!user.registered)
      return conn.sendMessage(
        m.chat,
        { text: "Pengguna Tidak Terdaftar", edit: key },
        { quoted: m },
      );
    if (user.banned)
      return conn.sendMessage(
        m.chat,
        { text: "User di banned....", edit: key },
        { quoted: m },
      );
    user.premium = true;
    user.premiumDate = "Infinity";
    await conn.sendMessage(
      m.chat,
      {
        text: `Verifikasi Selesai!
*• Username:* ${user.name}
*• Age:* ${user.age}
*• Premium:* ${user.premium ? "✅" : "❎"}
*• Expired:* Infinity`,
        edit: key,
      },
      { quoted: m },
    );
    await conn.sendMessage(
      number + "@s.whatsapp.net",
      {
        text: `Verifikasi Selesai
Username: ${user.name}
Age: ${user.age}
Premium: ${user.premium ? "✅" : "❎"}
Expired: Infinity`,
      },
      { quoted: m },
    );
  }
};
handler.help = ["addprem"].map((a) => a + "number,duration");
handler.tags = ["owner"];
handler.command = ["addprem"];
handler.owner = true;

module.exports = handler;

function no(number) {
  return number.replace(/\s/g, "").replace(/([@+-])/g, "");
}
