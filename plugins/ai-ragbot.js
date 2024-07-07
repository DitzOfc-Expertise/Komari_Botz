var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) return conn.reply(m.chat, `• *Example :* .ragbot Siapa presiden Indonesia? `, m)
  let tenka = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m)
  var result = await ragBot(text)
  await conn.sendMessage(m.chat, { text: '```' + `${result}` + '```', edit: tenka })
}      
handler.command = /^ragbot$/i
handler.help = ['ragbot *<text>*']
handler.tags = ['ai'];
handler.premium = false
module.exports = handler;

async function ragBot(message) {
  try {
    const response = await axios.post('https://ragbot-starter.vercel.app/api/chat', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'gpt-3.5-turbo',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}