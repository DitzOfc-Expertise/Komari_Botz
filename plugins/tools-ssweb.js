let axios = require('axios');
let handler = async (m, { conn, command, args, text }) => {
if (!text) return conn.reply(m.chat, '*EXAMPLE USAGE :* _.ss <link/url>_', m)
conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  try {
const ssweb = (url, device = 'desktop') => {
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                        result = {
                            status: 200,
                            result: data
                        }
                         resolve(result)
                    })
               } else {
                    reject({ status: 404, statuses: `Link Error`, message: data.data })
               }
          }).catch(reject)
     })
}
global.sh = text
let krt = await ssweb(global.sh)
conn.sendMessage(m.chat, { image: krt.result, caption: 'Done kak' }, { quoted: m })
  }catch (e) {
  conn.reply(e)
  }
}
handler.help = ['ssweb','sspc'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'sspc', 'ss',]

handler.limit = true;
handler.fail = null;

module.exports = handler;