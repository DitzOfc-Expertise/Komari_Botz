let fs = require('fs') 
let chalk = require('chalk')
let moment = require('moment-timezone')
// Owner
global.owner = [
  ['6285717062467'],
  ['6285717062467'],
  ['6285717062467', 'DitzOfc', 'contact@tenka.my.id', true]
] // Put your number here
global.mods = ['6285891267541'] // Moderator
global.prems = ['6285717062467'] // Premium
global.rose = 'YqzaFbPLBTCgEmCyqUHysLw9pRUw12CCELJxw6N7viYc1c3VDxk31iIGoomCzK0Z';
global.lolkey = 'pentilkuda';
global.neo = 'DitzOfc';
global.alya = 'DitzOfc';
global.yanz = 'Fardankey';
global.xzn = 'Always ditz';
global.APIs = {
    // API Prefix
    // name: 'https://website'
    lol: 'https://api.lolhuman.xyz',
    neoxr: 'https://api.neoxr.eu',
    alya: 'https://api.alyachan.dev',
    xzn: 'https://skizo.tech',
    yanz: 'https://api.yanzbotz.my.id',
}
global.APIKeys = {
    // APIKey Here
    // 'https://website': 'apikey'
    'https://api.neoxr.eu': 'DitzOfc',
    'https://api.lolhuman.xyz': 'pentilkuda',
    'https://api.alyachan.dev': 'DitzOfc',
    'https://skizo.tech': 'Always ditz',
    'https://api.yanzbotz.my.id': 'Fardankey'
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const spack = fs.readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = 'Sticker By'
  var sticker_author = 'Tenka Bot'
} else {
  var sticker_name = 'Sticker By'
  var sticker_author = 'Komari Bot'
}

const file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

// Document
global.minety = pickRandom(['application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
// Database
global.atlaapi= '8Zv6ptlT6VAyLTi0MXBgDr4gQgweeC7X1mZWcFuyFSQteGJ8GHuH8eS71BDhHc8iGZ7S8bBIBTi8v8oMzKnQrzhAdkpHirYEGcVg'
global.version = '2.0.1'
global.sessionName = 'Ditz' // Jangan Di Ubah
global.gcbot = 'https://chat.whatsapp.com/CfoZa7yhouZ51XXYM3lKY7'
global.instagram = 'https://instagram.com/wayssokasik'
// buttons settings
global.namebot = '© Komari_Botz(Public Bot)'
global.botversi = '2.0.1'
global.thumb = 'https://telegra.ph/file/cc3f75f0666f503d367a3.jpg'
global.docthumb = 'https://telegra.ph/file/7ca545ade6f60b4a4a771.jpg'
global.footer = 'Powered By _*Dev. Expertise*_'
global.newsletterJid = '120363279875321922@newsletter'
// Others 
global.qris = 'https://telegra.ph/file/bcb93fafb22f139ff1512.jpg'
global.email = 'AditGantengJir@gmail.com'
global.creator = "6285717062467@s.whatsapp.net"
global.nomorbot = '-'
global.nomorown = '6285717062467'

// Panel
global.domain = '' // Domain Web
global.apikey = '' // Key PTLA
global.c_apikey = '' // Key PTLC
global.eggs = '15'
global.locs = '1'
// Sosial Media
global.sig = '-'
global.syt = 'https://youtube.com/@DitzOfc'
global.sgh = '-'
global.sgc = 'https://chat.whatsapp.com/CfoZa7yhouZ51XXYM3lKY7'
global.swa = 'https://wa.me/6285717062467'
global.swb = '-' // Link Discord
global.snh = '' // Link nhentai

// Pembayaran
global.pdana = '~Not Found~'
global.povo = '~Not Found~'
global.pgopay = '~Not Found~'
global.pulsa = '~Not Found~'
global.pulsa2 = '~Not Found~'
global.psaweria = '~Not Found~'
global.ptrakteer = '~Not Found~'
global.psbuzz = '~Not Found~'

// Fake Size
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

global.useMulti = true
global.autoread = true

// Watermark
global.packname = 'DitzOfc'
global.author = '-'
global.wm = '©DitzOfc'
global.wm2 = 'DitzOfc'
global.titlebot = `${global.wm}`
global.danied = 'A K S E S  K A M U  D I  T O L A K!!'
global.done = '```Status Request :```' + ' `Succes`'
global.packname = 'Komari_Botz'
global.author = 'Aditya'
global.nameown = 'DitzOfc'
global.wait = 'Wait a moment... '

// Tampilan
global.htki =  '⬣───「' // Hiasan kiri
global.htka = '」───⬣' // Hiasan kanan
global.htjava = '❃' // Hiasan
global.sa = '╭─'
global.gx = '│✇'
global.gy = '│•'
global.gz = '│'
global.sb = '╰────࿐'
global.kki = '「'
global.kka = '」'

global.multiplier = 1000 // The higher, The harder levelup

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈' ,
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v =>vv [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})//
