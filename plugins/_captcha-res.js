let handler = m => m;
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.quoted.text || !m.text) return !0
    this.captchaCodes = this.captchaCodes ? this.captchaCodes : {}
    let capt = Object.values(this.captchaCodes).find(capt => capt.code && capt.time && [capt.id].includes(m.sender))
    if (!capt || capt.id != m.sender) return
    if (m.sender == capt.id && m.text.toLowerCase() == capt.code) {
            clearTimeout(this.time);
            delete this.captchaCodes[capt.id];
            this.reply(m.chat, Func.texted('bold', `✅ Successfully verified.`), m)     
     }
    
    return !0;
};

module.exports = handler