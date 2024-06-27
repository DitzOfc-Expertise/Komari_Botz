let axios = require('axios')

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `• *Example :* .${command} Hello`
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    try {
        let result = await generate(text)
        await m.reply(result.reply)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["aichatonline *<text>*"]
handler.tags = ["ai"];
handler.command = /^(aichatonline)$/i
module.exports = handler

/* New Line */
async function generate(q) {
    try {
        const {
            data
        } = await axios(
            `https://aichatonline.org/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}