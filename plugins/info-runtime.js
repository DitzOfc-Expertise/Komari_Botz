let fs = require('fs')

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " days, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hours, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minutes, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " seconds " : " seconds ") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay
}

let handler = async (m, { conn, args, command }) => {
	let muptime = runtime(process.uptime()).trim()
     await m.reply('```Online Selama : ```' + muptime)
}


handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler