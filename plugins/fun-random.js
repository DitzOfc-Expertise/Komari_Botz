let handler = async (
  m,
  { conn, args, participants, text, usedPrefix, command },
) => {
  switch (command) {
    case "memek":
    case "bego":
    case "goblok":
    case "janda":
    case "perawan":
    case "babi":
    case "tolol":
    case "pinter":
    case "pintar":
    case "asu":
    case "bodoh":
    case "gay":
    case "lesby":
    case "bajingan":
    case "jancok":
    case "anjing":
    case "ngentod":
    case "ngentot":
    case "monyet":
    case "mastah":
    case "newbie":
    case "bangsat":
    case "bangke":
    case "sange":
    case "sangean":
    case "dakjal":
    case "horny":
    case "wibu":
    case "puki":
    case "peak":
    case "pantex":
    case "pantek":
    case "setan":
    case "iblis":
    case "cacat":
    case "yatim":
    case "piatu": {
      let member = participants
        .map((u) => u.id)
        .filter((v) => v !== conn.user.jid);
      let org = member[Math.floor(Math.random() * member.length)];
      conn.sendMessage(
        m.chat,
        {
          text: `anak ${command} di sini adalah @${org.split("@")[0]}`,
          mentions: [org],
        },
        { quoted: m },
      );
      break;
    }
  }
};
handler.help = [
  "memek",
  "bego",
  "goblok",
  "janda",
  "perawan",
  "babi",
  "tolol",
  "pinter",
  "pintar",
  "asu",
  "bodoh",
  "gay",
  "lesby",
  "bajingan",
  "jancok",
  "anjing",
  "ngentod",
  "ngentot",
  "monyet",
  "mastah",
  "newbie",
  "bangsat",
  "bangke",
  "sange",
  "sangean",
  "dakjal",
  "horny",
  "wibu",
  "puki",
  "peak",
  "pantex",
  "pantek",
  "setan",
  "iblis",
  "cacat",
  "yatim",
  "piatu",
].map((a) => a + " *[random tag]*");
handler.tags = ["fun"];
handler.command = [
  "memek",
  "bego",
  "goblok",
  "janda",
  "perawan",
  "babi",
  "tolol",
  "pinter",
  "pintar",
  "asu",
  "bodoh",
  "gay",
  "lesby",
  "bajingan",
  "jancok",
  "anjing",
  "ngentod",
  "ngentot",
  "monyet",
  "mastah",
  "newbie",
  "bangsat",
  "bangke",
  "sange",
  "sangean",
  "dakjal",
  "horny",
  "wibu",
  "puki",
  "peak",
  "pantex",
  "pantek",
  "setan",
  "iblis",
  "cacat",
  "yatim",
  "piatu",
];
handler.group = true;
module.exports = handler;
