let handler = async (
  m,
  { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command },
) => {
  let chat = global.db.data.chats[m.chat];
  let prefix = usedPrefix;
  let bu = `*[ ✓ ] Success in creating a welcome to this group*`.trim();

  let isClose = {
    on: true,
    off: false,
  }[args[0] || ""];
  if (isClose === undefined) {
    var text5 = `For Example:
> *Example :* ${usedPrefix + command} on
> *Example :* ${usedPrefix + command} off`;
    m.reply(text5);

    throw false;
  } else if (isClose === false) {
    chat.welcome = isClose;
    await m.reply("*Successfully turned off welcome to this group*");
  } else if (isClose === true) {
    chat.welcome = isClose;
    await m.reply(bu);
  } else if (isClose === undefined) {
    var te = `For Example:
> *Example :* ${usedPrefix + command} on
> *Example :* ${usedPrefix + command} off`;

    m.reply(te);
  }
};

handler.help = ["welcome *[open/close]*"];
handler.tags = ["group"];
handler.command = ["welcome"];
handler.group = true;
handler.admin = true;
handler.botAdmin = false;

module.exports = handler;
