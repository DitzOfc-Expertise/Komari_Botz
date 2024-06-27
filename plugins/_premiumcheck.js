let handler = m => m
handler.before = async (m, { conn, isPrems, owner, isOwner }) => {
    if (isOwner) return
	if (isPrems) {
    if (new Date() * 1 >= global.db.data.users[m.sender].premiumDate) {
      conn.reply(m.chat, "Maaf waktu Premium anda telah habis!\n\nSilahkan hubungi owner untuk perpanjang waktu Premium!", m).then(() => {
        global.db.data.users[m.sender].premium = false 
        })
      }
     }
   }
module.exports = handler