async function before(m, {
    isOwner,
    conn
}) {
    if (!m.text.match(global.prefix)) return
    if (!m.text.match(global.prefix)) {
    conn.sendPresenceUpdate("composing", m.chat)
    } else {
    conn.sendPresenceUpdate("composing", m.chat)
    }
}

module.exports = {
    before,
}