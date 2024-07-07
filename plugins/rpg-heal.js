let handler = async (m, { args, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (user.health >= 200)
    return m.reply(
      `
Your ❤️health is full!
`.trim(),
    );
  const heal = 50;
  let count =
    Math.max(
      1,
      Math.min(
        Number.MAX_SAFE_INTEGER,
        (isNumber(args[0]) && parseInt(args[0])) ||
          Math.round((200 - user.health) / heal),
      ),
    ) * 1;
  if (user.potion < count)
    return m.reply(
      `
Your 🧃Potion is not enough, you only have *${user.potion}* 🧃Potion
type *${usedPrefix}buy potion ${count - user.potion}* to buy 🧃Potion
`.trim(),
    );
  user.potion -= count * 1;
  user.health += heal * count;
  m.reply(
    `
Sukses mengunakan *${count}* 🧃Potion(s)
`.trim(),
  );
};

handler.help = ["heal"];
handler.tags = ["rpg"];
handler.command = ["heal"];
handler.limit = true;

module.exports = handler;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
