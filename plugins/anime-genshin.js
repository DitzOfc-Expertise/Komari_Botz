const { characters } = require("genshin-db");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:*  ${usedPrefix + command} *[Chara Name]*`;

  m.reply(wait);
  try {
    let gh = await characters(text);
    let photo = Func.random(
      (await Scraper["Other"].searchPinterest(text + " genshin impact icon"))
        .result,
    );

    let caption = `*[ CHARA GENSHIN INFO ]*
*Name:* ${gh.name} *[ ${gh.title} ]*
*Gender:* ${gh.gender}
*Element:* ${gh.elementText}
*Region:* ${gh.region}
*Birthday:* ${gh.birthday}
*Description:* ${gh.description}
*Weapon Type:* ${gh.weaponType}
*Weapon Name:* ${gh.weaponText}

*CHARA VOICES:*
* *Korean:* ${gh.cv.korean || "Nothing"}
* *English:* ${gh.cv.english || "Nothing"}
* *Japanese:* ${gh.cv.japanese || "Nothing"}
* *Chinese:* ${gh.cv.chinese || "Nothing"}

*• COSTS:*
* *Ascend [ 1 ] :* ${gh.costs.ascend1.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}

* *Ascend [ 2 ] :* ${gh.costs.ascend2.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}

* *Ascend [ 3 ] :* ${gh.costs.ascend3.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}

* *Ascend [ 4 ] :* ${gh.costs.ascend4.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}

* *Ascend [ 5 ] :* ${gh.costs.ascend5.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}

* *Ascend [ 6 ] :* ${gh.costs.ascend6.map((a, i) => `\n*${a.name}* || *• ID:* ${a.id} || *•Count:* ${a.count}`).join(" ")}
`;
    m.reply(caption, photo);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["charagi"];
handler.tags = ["anime"];
handler.command = ["charagi"];
module.exports = handler;
