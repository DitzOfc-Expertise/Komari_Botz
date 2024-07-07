const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let handler = async (m, { conn }) => {
  m.reply('Pong! Testing bot status...')
  let networkInterfaces = os.networkInterfaces();
  let interfaceName = Object.keys(networkInterfaces)[0];
  let incomingNetwork = networkInterfaces[interfaceName][0].rx_bytes;
  let outgoingNetwork = networkInterfaces[interfaceName][0].tx_bytes;
  let info = {
    OS: `${os.type()} ${os.release()} (${os.arch()})`,
    RAM: `${(os.totalmem() / 1024 / 1024).toFixed(2)} / 31175 GB`,
    Used_RAM: `${(os.totalmem() - os.freemem()) / 1024 / 1024} MB`,
    CPU_Load: `${(os.loadavg()[0] / os.cpus().length * 100).toFixed(2)}%`,
    NodeJS: process.version,
    NPM: (await exec('npm -v')).stdout.trim(),
    Bot_Version: `${version}`,
    Owner: 'DitzOfc',
  }
  let caption = Object.entries(info).map(([key, value]) => `• *${key}:* ${value}`).join('\n')
  conn.reply(m.chat, caption, m, { parse_mode: 'Markdown' })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = /^ping$/i
handler.register = true
handler.limit = true

module.exports = handler