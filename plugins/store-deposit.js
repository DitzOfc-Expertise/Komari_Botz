const { Saweria } = require("../lib/saweria");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.deposit = conn.deposit ? conn.deposit : {};
  if (!text) throw `*• Example :* ${usedPrefix + command} *[amount]*`;
  if (isNaN(text)) throw `*[ x ] Input Number not alphabet*`;
  if (text < 1000) throw `*[ x ] Minimum deposit 1.000, Max 1.000.000*`;
  if (text > 1000000) throw `*[ x ] Minimum deposit 1.000, Max 1.000.000*`;
  m.reply(wait);
  try {
    let a = new Saweria(db.data.saweria);
    // Note: ketik .login email, password buat bisa pakai deposit ini
    let qris = await (await a.createQr(text, "Deposit saldo")).data;
    let caption = `*[ DEPOSIT SALDO ]*
*• Nominal:* ${Func.formatNumber(text)}
*• Mata Uang:* ${qris.currency}
*• Pesan:* ${qris.message}
*• Id deposit:* ${qris.id}
*• Bayar sebelum:* ${qris.expired_at}

*👤 Silahkan Scan Qris diatas di e Wallet kalian*
*✅ QRIS INI SUPPORT UNTUK: DANA, OVO, DOPAY, SHOPPEEPAY, DLL*`;
    let key = await conn.sendMessage(
      m.chat,
      {
        image: Buffer.from(qris.qr_image.substring(22), "base64"),
        caption: caption,
      },
      { quoted: fkontak },
    );
    conn.deposit[m.sender] = {
      status: false,
      jid: m.sender,
      name: m.name,
      nominal: text,
      id: qris.id,
      reply: key,
    };
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      });
      conn.sendMessage(
        m.chat,
        {
          text: `*❌ SESSIONS EXPIRED*
Silahkan ketik *[.deposit ]* kembali untuk melakukan deposit saldo`,
        },
        { quoted: key },
      );
      delete conn.deposit[m.sender];
    }, 600000); // Delay 10 menit
  } catch (e) {
    throw e;
  }
};
handler.before = async (m, { conn }) => {
  conn.deposit = conn.deposit ? conn.deposit : {};
  if (!m.text) return;
  if (!conn.deposit[m.sender]) return; // Tambahkan pengecekan apakah conn.deposit[m.sender] sudah ada atau belum
  let a = new Saweria(db.data.saweria);
  let cek = await a.cekPay(conn.deposit[m.sender].id);
  if (conn.deposit[m.sender].id) {
    if (cek.msg === "SUCCESS") {
      db.data.users[m.sender].saldo += conn.deposit[m.sender].nominal;
      conn.deposit[m.sender].status = true;
      let cap = `*[ ✅ TRANSAKSI SUCCES ]*
*Nama :* @${conn.deposit[m.sender].jid.split("@")[0]}
*Nominal :* ${Func.formatNumber(conn.deposit[m.sender].nominal)}
*ID :* *[ ${conn.deposit[m.sender].id} ]*

*Terima kasih Sudah Order, Saldo anda sudah masuk kedalam Database bot kami, Tenang semua di jamin aman!*`;
      await conn.sendMessage(
        m.chat,
        {
          image: await Scraper["Tools"].ssweb(cek.url),
          caption: cap,
          mentions: [conn.deposit[m.sender].jid],
        },
        { quoted: conn.deposit[m.sender].reply },
      );
      setTimeout(() => {
        delete conn.deposit[m.sender];
      }, 5000);
    } else
      console.log(
        require("chalk").green.bold("[ System notif ] Waiting For Payment"),
      );
  } else return;
};

handler.help = ["deposit"].map((a) => a + " *[amount]*");
handler.tags = ["store"];
handler.command = ["deposit"];
module.exports = handler;
