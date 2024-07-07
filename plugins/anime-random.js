let handler = async (m, { conn, text, usedPrefix, command }) => {
  let res = await (
    await fetch(
      `https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`,
    )
  ).json();
  let cita = res[Math.floor(Math.random() * res.length)];
  let buttons = [{ text: 'Next Image', id: `${usedPrefix + command}` }]
  await conn.sendButtonImg(m.chat, `*Result from :* \`${command}\``, global.footer, buttons, cita, m)
};
handler.help = [
  "akira",
  "akiyama",
  "anna",
  "asuna",
  "ayuzawa",
  "boruto",
  "chitanda",
  "chitoge",
  "deidara",
  "doraemon",
  "elaina",
  "emilia",
  "asuna",
  "erza",
  "gremory",
  "hestia",
  "hinata",
  "inori",
  "itachi",
  "isuzu",
  "itori",
  "kaga",
  "kagura",
  "kakasih",
  "kaori",
  "kaneki",
  "kosaki",
  "kotori",
  "kuriyama",
  "kuroha",
  "kurumi",
  "madara",
  "mikasa",
  "miku",
  "minato",
  "naruto",
  "natsukawa",
  "nekohime",
  "nezuko",
  "nishimiya",
  "onepiece",
  "pokemon",
  "rem",
  "rize",
  "sagiri",
  "sakura",
  "sasuke",
  "shina",
  "shinka",
  "shizuka",
  "shota",
  "tomori",
  "toukachan",
  "tsunade",
  "yatogami",
  "yuki",
].map((a) => a + " *[random image]*");
handler.tags = ["anime"];
handler.command = [
  "akira",
  "akiyama",
  "anna",
  "asuna",
  "ayuzawa",
  "boruto",
  "chitanda",
  "chitoge",
  "deidara",
  "doraemon",
  "elaina",
  "emilia",
  "asuna",
  "erza",
  "gremory",
  "hestia",
  "hinata",
  "inori",
  "itachi",
  "isuzu",
  "itori",
  "kaga",
  "kagura",
  "kakasih",
  "kaori",
  "kaneki",
  "kosaki",
  "kotori",
  "kuriyama",
  "kuroha",
  "kurumi",
  "madara",
  "mikasa",
  "miku",
  "minato",
  "naruto",
  "natsukawa",
  "nekohime",
  "nezuko",
  "nishimiya",
  "onepiece",
  "pokemon",
  "rem",
  "rize",
  "sagiri",
  "sakura",
  "sasuke",
  "shina",
  "shinka",
  "shizuka",
  "shota",
  "tomori",
  "toukachan",
  "tsunade",
  "yatogami",
  "yuki",
];
handler.limit = true;

module.exports = handler;