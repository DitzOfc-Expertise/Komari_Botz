const cooldown = 300000;
let handler = async (m, { usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let timers = cooldown - (new Date() - user.lastadventure);
  if (user.health < 80)
    return conn.sendFile(
      m.chat,
      imgr + "lowhealth",
      "",
      `${htki} LOW HEALTH ${htka}\nʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs ʙᴇʟᴏᴡ 80﹗
ᴩʟᴇᴀsᴇ ʜᴇᴀʟ ❤ ғɪʀsᴛ ᴛᴏ ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴀɢᴀɪɴ.`.trim(),
      m,
    );
  if (new Date() - user.lastadventure <= cooldown)
    return conn.reply(
      m.chat,
      `[ COOLDOWN ]\nʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ *ᴀᴅᴠᴇɴᴛᴜʀᴇ*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${timers.toTimeString()}`.trim(),
      m,
    );
  const rewards = reward(user);
  const info = await getInfoNegaraAcak();
  const cmenub = "•";
  let teks = `🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴛᴏ *${info.nama}*
${cmenub} *Nama resmi:* ${info.namaResmi}
${cmenub} *Wilayah:* ${info.wilayah}
${cmenub} *Subwilayah:* ${info.subwilayah}
${cmenub} *Zona waktu:* ${info.zonaWaktu.join(", ")}
${cmenub} *Bendera:* ${info.bendera}
${cmenub} *Populasi:* ${info.populasi}
${cmenuf}

ᴀᴅᴠᴇɴᴛᴜʀᴇ ғɪɴɪsʜ`;
  for (const lost in rewards.lost)
    if (user[lost]) {
      const total = rewards.lost[lost].getRandom();
      user[lost] -= total * 1;
      if (total) teks += `\n${global.rpg.emoticon(lost)}${lost}: ${total}`;
    }
  teks += "\n\n🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :";
  for (const rewardItem in rewards.reward)
    if (rewardItem in user) {
      const total = rewards.reward[rewardItem].getRandom();
      user[rewardItem] += total * 1;
      if (total)
        teks += `\n⮕ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${total}`;
    }
  conn.sendFile(
    m.chat,
    info.urlGambarOg,
    "",
    `${htki} ADVENTURE ${htka}\n` + teks.trim(),
    m,
  );
  user.lastadventure = new Date() * 1;
};
handler.help = ["adventure"];
handler.tags = ["rpg"];
handler.command = ["adventure"];
handler.cooldown = cooldown;
handler.disabled = false;

module.exports = handler;

async function getInfoNegaraAcak() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const indeksAcak = Math.floor(Math.random() * data.length);
    const negara = data[indeksAcak];
    const html = await (await fetch(negara.maps.googleMaps)).text();
    const $ = cheerio.load(html);
    const ogImageURL = $('meta[property="og:image"]').attr("content");

    const info = {
      nama: negara.name.common || "Tidak diketahui",
      namaResmi: negara.name.official || "Tidak diketahui",
      wilayah: negara.region || "Tidak diketahui",
      subwilayah: negara.subregion || "Tidak diketahui",
      zonaWaktu: negara.timezones || "Tidak diketahui",
      bendera: negara.flag || "Tidak diketahui",
      populasi: negara.population || "Tidak diketahui",
      urlGambarOg:
        ogImageURL ||
        "https://raw.githubusercontent.com/AyGemuy/Taylors/master/thumbnail.jpg",
    };

    return info;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function reward(user = {}) {
  let rewards = {
    reward: {
      money: 201,
      exp: 301,
      trash: 101,
      potion: 2,
      rock: 2,
      wood: 2,
      string: 2,
      common: 2 * ((user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2) || 1),
      uncommon: [0, 0, 0, 1, 0].concat(
        new Array(
          5 -
            ((user.dog > 2 && user.dog < 6 && user.dog) ||
              (user.dog > 5 && 5) ||
              2),
        ).fill(0),
      ),
      mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
        new Array(
          8 -
            ((user.dog > 5 && user.dog < 8 && user.dog) ||
              (user.dog > 7 && 8) ||
              3),
        ).fill(0),
      ),
      legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
        new Array(10 - ((user.dog > 8 && user.dog) || 4)).fill(0),
      ),
      cat: [0, 1, 0, 0, 0],
      centaur: [0, 1, 0, 0, 0],
      dog: [0, 1, 0, 0, 0],
      dragon: [0, 1, 0, 0, 0],
      emerald: [0, 1, 0, 0, 0],
      fox: [0, 1, 0, 0, 0],
      griffin: [0, 1, 0, 0, 0],
      horse: [0, 1, 0, 0, 0],
      kyubi: [0, 1, 0, 0, 0],
      lion: [0, 1, 0, 0, 0],
      pet: [0, 1, 0, 0, 0],
      phonix: [0, 1, 0, 0, 0],
      rhinoceros: [0, 1, 0, 0, 0],
      robo: [0, 1, 0, 0, 0],
      wolf: [0, 1, 0, 0, 0],
      iron: [0, 0, 0, 1, 0, 0],
      gold: [0, 0, 0, 0, 0, 1, 0],
      diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
        new Array(
          5 - ((user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0),
        ).fill(0),
      ),
    },
    lost: {
      health: 101 - user.cat * 4,
      armordurability: (15 - user.armor) * 7,
    },
  };
  return rewards;
}
