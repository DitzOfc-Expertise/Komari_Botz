const axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Ditz`, m)
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let hasil = await getBuffer(`https://shannmoderz-95f1d384b6d2.herokuapp.com/ephoto360/${command}?query=${text}`)
  conn.sendFile(m.chat, hasil, '', 'Powered by : https://api-shannmoderz.github.io', m)
}

handler.help = [
  'glitchtext', 'writetext', 'blackpinklogo', 'advancedglow', 'typographytext', 'pixelglitch', 'neonglitch', 'flag', 'flag2', 
  'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwater', 'logomaker', 'cartoonstyle', 'papercut', 'watercolor', 
  'effectclouds', 'gradienttext', 'summerbeach', 'luxurygold', 'multicolored', 'sandsummer', 'galaxy', '1917style', 
  'makingneon', 'royaltext', 'texteffect', 'galaxystyle', 'lighteffect'
].map(v => v + ' *<teks>*')

handler.command = /^(glitchtext|writetext|blackpinklogo|advancedglow|typographytext|pixelglitch|neonglitch|flag|flag2|deletingtext|blackpinkstyle|glowingtext|underwater|logomaker|cartoonstyle|papercut|watercolor|effectclouds|gradienttext|summerbeach|luxurygold|multicolored|sandsummer|galaxy|1917style|makingneon|royaltext|texteffect|galaxystyle|lighteffect)$/i
handler.tags = ['ephoto']
handler.limit = true

module.exports = handler

let getBuffer = async (url, options) => {
  try {
    options ? options : {}
    const res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (err) {
    return err
  }
}
