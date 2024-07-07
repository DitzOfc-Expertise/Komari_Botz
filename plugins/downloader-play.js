let ytdl = require('ytdl-core')
let yts = require('yt-search')
let fs = require('fs')
let ffmpeg = require('fluent-ffmpeg')
let { pipeline } = require('stream')
let { promisify } = require('util')
let os = require('os')

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} Tentang Perasaanku`, m)
   conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
      try {
    let results = await yts(text);
    let videoId = results.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let uploadDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = results.videos[0].description;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;       
    let audio = ytdl(videoId, { quality: 'highestaudio' });
    let inputFilePath = './tmp/' + title + '.webm';
    let outputFilePath = './tmp/' + title + '.mp3';
    let viewsFormatted = formatViews(views);
    await conn.sendMessage(m.chat, { react: { text: "🕑",key: m.key,}
  })
    let infoText = `
*${title}*

> *Duration*: ${durationText}
> *Upload*: ${uploadDate}
> *Views*: ${viewsFormatted}
> *Link*: ${url}

Please wait, your audio will be sent.

Do You Want To Convert This Play To Video? Click Button To Video! `
let buttons = [{ text: 'To Video🎦', id: `.ytmp4 ${url}` }]
await conn.sendButtonImg(m.chat, infoText, global.footer, buttons, thumbnailUrl, m)
    audio.pipe(fs.createWriteStream(inputFilePath)).on('finish', async () => {
      ffmpeg(inputFilePath)
        .toFormat('mp3')
        .on('end', async () => {
          let buffer = fs.readFileSync(outputFilePath);                    
         conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg', }, { quoted: m });
                
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on('error', (err) => {
          console.log(err);
          m.reply(`There was an error converting the audio: ${err.message}`);
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .save(outputFilePath);
    });
  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while searching for the song: ${e.message}`);
  }
};

handler.help = ['play'].map((v) => v + ' *<text>*');
handler.tags = ['music'];
handler.command = /^play$/i;

handler.exp = 0;
handler.limit = true;
handler.register = true

module.exports = handler

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
}