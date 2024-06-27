let fetch = require('node-fetch')
let cheerio = require('cheerio')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} tomodachi game`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const hasil = await kusoNime(text)
    let kata = '*K U S O N I M E - S E A R C H*\n\n'
    kata += '```Title:```'+` ${hasil.result.title}\n`
    kata += '```Genre:```'+` ${hasil.result.genre}\n`
    kata += '```Views:```'+` ${hasil.result.views}\n`
    kata += '```Seasons:```'+` ${hasil.result.seasons}\n`
    kata += '```Producers:```'+` ${hasil.result.producers}\n`
    kata += '```Status:```'+` ${hasil.result.status}\n`
    kata += '```Ranting:```'+` ${hasil.result.ranting}\n`
    kata += '```Duration:```'+` ${hasil.result.duration}\n`
    kata += '```Release:```'+` ${hasil.result.release}\n`
    let kiku = await conn.sendMessage(m.chat, {
    text: `${kata}\n*Powered By:* _https://kusonime.com_`,
    contextInfo: {
    externalAdReply: {
    title: 'KOMARI_BOTZ',
    body: 'Version: 2.0.0',
    thumbnailUrl: hasil.result.thumb,
    sourceUrl: hasil.result.url,
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, {quoted: m })
    await conn.reply(m.chat, '```Description:\n```'+`${hasil.result.desc}`, kiku)
};
handler.help = ["kusonime *<text>*"]
handler.tags = ["search"]
handler.command = ["kusonime"]
handler.premium = false
handler.register = true

module.exports = handler

async function kusoNime(query) {
    return new Promise(async (resolve, reject) => {
      const optionsGet = {
        method: 'GET',
        headers: {
           'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
        }
    }
    const getHtml = await fetch('https://kusonime.com/?s=' + query + '&post_type=anime', optionsGet).then(rsp => rsp.text())
    const $ = cheerio.load(getHtml)
    const url = []
    $('div > div > ul > div > div > div').each(function() {
      url.push($(this).find('a').attr('href'))
    })
    const randomUrl = url[Math.floor(Math.random() * url.length)]
    const getHtml2 = await fetch(randomUrl, optionsGet).then(rsp => rsp.text())
    const $$ = cheerio.load(getHtml2)
    resolve({
      status: 200,
      result: {
        title: $$('.vezone > .venser').find('.jdlz').text(),
        thumb: $$('.vezone > .venser').find('div > img').attr('src'),
        views: $$('.vezone > .venser').find('div > div > span').text().trim().replace(' Views', ''),
        genre: $$('.vezone > .venser').find('.lexot > .info > p').eq(1).text().replace('Genre : ', ''),
        seasons: $$('.vezone > .venser').find('.lexot > .info > p').eq(2).text().replace('Seasons : ', ''),
        producers: $$('.vezone > .venser').find('.lexot > .info > p').eq(3).text().replace('Producers: ', ''),
        type: $$('.vezone > .venser').find('.lexot > .info > p').eq(4).text().replace('Type: ', ''),
        status: $$('.vezone > .venser').find('.lexot > .info > p').eq(5).text().replace('Status: ', ''),
        rating: $$('.vezone > .venser').find('.lexot > .info > p').eq(7).text().replace('Score: ', ''),
        duration: $$('.vezone > .venser').find('.lexot > .info > p').eq(8).text().replace('Duration: ', ''),
        release: $$('.vezone > .venser').find('.lexot > .info > p').eq(9).text().replace('Released on: ', ''),
        desc: $$('.vezone > .venser').find('p').eq(10).text(),
        url: randomUrl
      }
    })
  })
}