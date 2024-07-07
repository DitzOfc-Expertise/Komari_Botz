const handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];
  const hargaPremium = {
    7: 10000,
    30: 20000,
    360: 50000,
  };

  const input = text.trim();
  if (!input) {
    let harga = `*〤 P R E M I U M - B O T 〤*\n${Object.entries(hargaPremium)
      .map(
        ([key, harga]) =>
          `*${key}*. Untuk *${key} hari* total *Rp.${harga.toLocaleString()}*`,
      )
      .join("\n")}	\n\nKetik *.buyprem jumlah hari* untuk melakukan pembelian\n
      
      *❒ KEUNTUNGAN PREMIUM*
• Premium Unlimited Limit 
• Bisa Menggunakan Fitur Premium
• Anti Banned Dari Fitur Bot`;
    return conn.reply(m.chat, harga, m);
  }

  const harga = hargaPremium[input];
  if (!harga) return conn.reply(m.chat, "*Pilihan harga tidak valid.*", m);

  let { key } = await conn.reply(
    m.chat,
    `
*UPGRADE TO PREMIUM*

Tingkatkan keanggotaan premium dan nikmati manfaat eksklusif!
============================
=> *Harga:* *Rp.${harga.toLocaleString()}*
=============================
Balas dengan *Y* untuk meningkatkan keanggotaan premium atau *N* untuk membatalkan.
  `,
    m,
  );

  conn.buyprem[m.chat] = {
    list: input,
    hargaPremium,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { delete: key });
      delete conn.buyprem[m.chat];
    }, 60 * 1000),
  };
};

handler.before = async (m, { conn }) => {
  conn.buyprem = conn.buyprem || {};
  if (m.isBaileys || !(m.chat in conn.buyprem)) return;
  let user = global.db.data.users[m.sender];
  const input = m.text.trim().toUpperCase();
  if (!/^[YN]$/i.test(input)) return;
  const { list, key, hargaPremium, timeout } = conn.buyprem[m.chat];
  const harga = hargaPremium[list];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  if (input === "Y") {
    if (user.saldo < harga) {
      m.reply(
        `*Anda membutuhkan setidaknya Saldo Rp:${harga} untuk menjadi pengguna premium.*\n\n Ketik *.deposit* untuk mengisi saldo`,
      );
    } else {
      user.saldo -= harga;
      var jumlahHari = 86400000 * list;
      var now = new Date() * 1;

      user.premiumDate = user.premiumDate || now;
      user.premiumDate += jumlahHari;

      if (!user.premium) user.premium = true;

      let message = user.premium
        ? `*Selamat sekarang kamu adalah anggota premium.*\n⏳ *Countdown:* ${getCountdownText(now, user.premiumDate)}`
        : `🎉 *Selamat! Anda sekarang pengguna premium.* 🎉\n⏳ *Countdown:* ${getCountdownText(now, user.premiumDate)}`;

      conn.reply(m.chat, message, m);
      conn.sendMessage(m.chat, { delete: key });
      clearTimeout(timeout);
      delete conn.buyprem[m.chat]; // Remove the session after the user has made a choice
    }
  } else if (input === "N") {
    conn.reply(m.chat, "✅ *Anda telah membatalkan pesanan*", m);
    conn.sendMessage(m.chat, { delete: key });
    clearTimeout(timeout);
    delete conn.buyprem[m.chat];
  }
};

handler.help = ["buyprem"].map((a) => a + "*[buy premium here]*");
handler.tags = ["info"];
handler.command = /^buyprem$/i;

module.exports = handler;

function getCountdownText(now, premiumTime) {
  let remainingTime = premiumTime - now;
  let days = Math.floor(remainingTime / 86400000);
  let hours = Math.floor((remainingTime % 86400000) / 3600000);
  let minutes = Math.floor((remainingTime % 3600000) / 60000);
  let seconds = Math.floor((remainingTime % 60000) / 1000);

  let countdownText = "";

  if (days > 0) countdownText += `${days} hari `;
  if (hours > 0) countdownText += `${hours} jam `;
  if (minutes > 0) countdownText += `${minutes} menit `;
  if (seconds > 0) countdownText += `${seconds} detik`;

  return countdownText.trim();
}
