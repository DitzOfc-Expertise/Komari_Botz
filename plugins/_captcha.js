const captcha = require('@neoxr/captcha')

async function before(m, { conn, isAdmin, isBotAdmin, isOwner }) {
    const chat = global.db.data.chats[m.chat];
    const userID = m.messageStubParameters[0];
    conn.captchaCodes = conn.captchaCodes || {};
    
    let delay = time => new Promise(res => setTimeout(res, time))

    if (chat.captcha && m.messageStubType === 27) {
        let meta = await (await conn.groupMetadata(m.chat))
        let newCaptcha = captcha()
        let image = Buffer.from(newCaptcha.image.split(',')[1], 'base64')
        let code = Math.floor(1000 + Math.random() * 9000);
        let caption = `Hai @${userID.split('@')[0]} 👋🏻\n`
        caption += `Selamat datang di grup *${meta.subject}* sebelum melakukan aktifitas didalam grup lakukan *VERIFIKASI* dengan mengirimkan *KODE CAPTCHA* pada gambar diatas.\n\n`
        caption += `*Timeout* : [ 1 menit ]`
        conn.captchaCodes[userID] = {
            chat: await conn.sendFile(m.chat, image, 'captcha.jpg', caption, null, { mentions: [userID] } ),
            id: userID,
            code: newCaptcha.value,
            time: setTimeout(async () => {
                if (conn.captchaCodes[userID]) {
                    await conn.reply(m.chat, Func.texted('bold', `🚩 Member : [ @${userID.split`@`[0]} ] did not verify.`), null, { mentions: [userID] })
                    await delay(3000);
                    
                    conn.groupParticipantsUpdate(m.chat, [userID], 'remove');
                    delete conn.captchaCodes[userID];
                }
            }, 80000 )
        }
    }
}

module.exports = {
    before,
};