const { WAMessageStubType } = require('@whiskeysockets/baileys')
const { format } = require('util')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

async function before(m) {
	if (m.fromMe && m.isBaileys) return !0
	if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)) {
		let adit = await this.reply(m.chat, 'Kamu Di blokir secara otomatis oleh Bot karena terdeteksi telah lancang Menelpon!\n\nJika ingin di buka blokirannya segera hubungi Owner!', null)
		await this.sendContact(m.chat, ['6285717062467@s.whatsapp.net', 'Costumer Service'], adit)
		await delay(1000)
		await this.updateBlockStatus(m.chat, "block")
	}
}

module.exports = {
    before,
}