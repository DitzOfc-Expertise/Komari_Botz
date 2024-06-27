const axios = require('axios');

const handler = async (m, { conn, usedPrefix, command, text, args }) => {
    if (!text) {
        return conn.reply(m.chat, 
            `• *Example :* ${usedPrefix + command} and text it*`,
        m);
    }
    
    const apiURL = 'https://api.itsrose.rest/image/diffusion/txt2img';
    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': global.rose,
            'Content-Type': 'application/json'
        },
        data: {
            "server_name": "jisoo",
            "prompt": text,
            "negative_prompt": "nsfw, bad anatomy, lowres, extra hands, extra legs, extra finger",
            "width": 512,
            "height": 512,
            "steps": 25,
            "model_id": "meinamix",
            "sampler": "UniPC",
            "cfg": 7.5,
            "seed": "",
            "enhance_prompt": "no",
            "multi_lingual": "no",
            "image_num": 1,
            "panorama": "no",
            "safety_checker": "no",
            "safety_checker_type": "blur",
            "lora_model": "",
            "lora_strength": 1,
            "clip_skip": 2,
            "embeddings_model": "",
            "webhook": ""
        }
    };
    conn.reply(m.chat, 'Generating... If you find an error code during the process then ignore it', m)
    try {
        const response = await axios(apiURL, options);
        const data = response.data;
        console.log(response)
        if (data.status) {
            const hasil = data.result.images;
            if (hasil && hasil.length > 0) {
                for (let img of hasil) {
                    // Mengunduh gambar dari URL
                    const imageResponse = await axios.get(img, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(imageResponse.data, 'binary');
                    await conn.sendFile(m.chat, buffer, 'result.jpg', '', m);
                }
            } else {
                conn.reply(m.chat, 'No images returned from the API', m);
            }
        } else {
            conn.reply(m.chat, `Error: ${data.message}`, m);
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        conn.reply(m.chat, `Terjadi kesalahan: ${error.response ? error.response.data.message : error.message}`, m);
    }
};

handler.help = ['animediff *<text>*'];
handler.command = /^animediff$/i;
handler.tags = ["diffusion"];
module.exports = handler;
