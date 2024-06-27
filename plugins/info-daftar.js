let handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = db.data.users[m.sender];
  if (user.registered) throw "*You already registered on bot*";
  if (!text) throw `*• Example :* ${usedPrefix + command} *[name.age]*`;
  try {
    const pp = await conn
      .profilePictureUrl(m.sender, "image")
      .catch((e) => "https://telegra.ph/file/241b747767455c4bcfc7b.jpg");
    let [name, age] = text.split(".");

    if (isNaN(age)) throw `*Input Age!*`;
    if (name.length < 4)
      throw `*Minimum Name Length Is 4*`;
    if (age < 5) throw `*Too child*`;
    if (age > 50) throw `Too Old`;
    let id = await Func.makeId(25);
    user.registered = true;
    user.age = age;
    user.name = name;
    user.sn = "Komari_Botz_userId-" + id;
    let key = await conn.sendMessage(
      m.chat,
      {
        image: {
          url: pp,
        },
        caption: "Verify...",
      },
      { quoted: m },
    );
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: pp,
        },
        caption: `Succes Verifying
*Name:* ${user.name}
*Age:* ${user.age} y/o
*ID:* Komari_Botz_userId-${id}

©DitzOfc`,
        edit: key.key,
        contextInfo: { mentionedJid: [m.sender] },
      },
      { quoted: m },
    );
  } catch (e) {
    throw e;
  }
};
handler.help = ["daftar", "register", "reg", "verify"]
handler.tags = ["info"];
handler.command = ["daftar", "register", "reg", "verify"];
module.exports = handler;
