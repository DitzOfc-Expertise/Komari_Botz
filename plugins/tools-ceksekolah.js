const fetch = require("node-fetch");

let handler = async(m, { text, args, command }) => {
  if (!text) return m.reply('Masukan nama sekolah yang ingin kamu cari!')
  m.reply('Mencari...')
  try {
    let res = await fetch(`https://anabot.my.id/api/tools/cekNpsn?namaSekolah=${encodeURIComponent(text)}&apikey=DitzOfc`)
    let tenka = await res.json()
    let result = tenka.result

    if (result === 0) {
      return m.reply('Sekolah tidak ditemukan!')
    }

    let hasil = result.map((sch, index) => {
      return `
*${index + 1}. ${sch.name}*
NPSN: ${sch.npsn}
Kota: ${sch.city}
Tipe: ${sch.type}
Id: ${sch.id}

Data Resmi Di Ambil Di https://www.kemdikbud.go.id
`
    }).join('\n');

    m.reply(hasil);
  } catch (e) {
    console.error(e)
    m.reply('Error!')
  }
}

handler.command = /^(ceksekolah|infosekolah)$/i
handler.tags = ["tools"]
handler.help = ["ceksekolah *<text>*"]

module.exports = handler