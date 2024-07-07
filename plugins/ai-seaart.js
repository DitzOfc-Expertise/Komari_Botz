const pagePre = 40;
const apiUrl = 'https://www.seaart.ai/api/v1/artwork/list';

const fetchData = async (requestData) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const {
            data
        } = await response.json();
        const items = data.items;

        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('No items found.');
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

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
    } else return m.reply("• *Example :* .seaart dog")
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const requestData = {
        page: 1,
        page_size: pagePre,
        order_by: 'new',
        type: 'community',
        keyword: text,
        tags: []
    };
    try {
        const result = await fetchData(requestData);
        await conn.sendMessage(m.chat, {
            image: {
                url: result.banner.url
            },
            caption: done,
            mentions: [m.sender]
        }, {
            quoted: m
        });
    } catch (e) {
    await conn.reply(m.chat, '```Status Request :```'+' `Failed`', m)
    }
}
handler.help = ["seaart *<text>*"]
handler.tags = ["ai"]
handler.command = /^(seaart)$/i

module.exports = handler