const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

let handler = async (m, { conn, text, usedPrefix, command, args }) => {  
  if (!text) throw `• *Example :* ${usedPrefix}${command} enhance`;

  // Cek apakah ada gambar yang dikirim atau dikutip
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return conn.reply(m.chat, 'Send/Reply Images with the caption *.beauty*', m);

  // Download gambar dari pesan
  let imgBuffer = await q.download();

  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

  // Siapkan form data untuk permintaan POST
  const form = new FormData();
  form.append('file', imgBuffer, {
    filename: 'image.jpg',
    contentType: mime
  });

  const url = `https://api.itsrose.rest/image/beauty_plus?enhance=5&json=true`;
  const headers = {
    'accept': 'application/json',
    'Authorization': global.rose,
    // Note: FormData will set the correct 'Content-Type' boundary automatically
  };

  // Lakukan permintaan POST ke API
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: form
  })
  .then((response) => response.json())
  .then(data => {
    if (data.status) {
      const buffer = Buffer.from(data.result.base64Image, 'base64');
      conn.sendFile(m.chat, buffer, 'enhanced.jpg', '', m);
    } else {
      throw 'Gagal mendapatkan gambar yang ditingkatkan';
    }
  })
  .catch(error => {
    conn.sendMessage(m.chat, `Terjadi kesalahan: ${error}`, 'conversation');
  });
};

handler.tags = ['ai'];
handler.help = ['beautyplus *<text>*'];
handler.command = /^(beautyplus|beautyplusdiff)$/i;
handler.limit = true;

module.exports = handler;
