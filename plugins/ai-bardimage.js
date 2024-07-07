const fetch = require('node-fetch');
const axios = require('axios');
const uploadImage = require('../lib/uploadImage.js');
let handler = async (m, { conn, args, usedPrefix, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime || !text) return conn.reply(m.chat, 'Send Reply Image With Text!', m);

  let img = await q.download();
  let base64String = await imageToBase64(img);
  console.log('String Base64', base64String)
  let tenka = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m);

  try {
    const payload = {
      prompt: text, // Ganti 'prompt' dengan input yang sesuai
      buffer: base64String,
      apikey: 'DitzOfc' // Ganti dengan API key yang benar
    };

    const { data } = await axios.post('https://anabot.my.id/api/ai/geminiImage', payload);
    console.log('API Response:', data); // Tambahkan console.log untuk memeriksa respons API
    let hasil = data.result; // Pastikan ini sesuai dengan struktur respons API
    await conn.sendMessage(m.chat, { text: `${hasil}`, edit: tenka });
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, `Gagal Silahkan Ulangi Command`, m);
  }
};

handler.help = ['bardi *<text>*'];
handler.tags = ['ai'];
handler.command = /^(bardi)$/i;
handler.premium = false;
module.exports = handler;

async function imageToBase64(imgBuffer) {
  return imgBuffer.toString('base64');
}