let handler = async (m, { conn, usedPrefix, command, isOwner, isAdmin }) => {
  conn.votekick = conn.votekick || {};
  let who;
  if (m.isGroup) {
    try {
      who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : undefined);
    } catch (error) {
      console.error("Error getting target:", error);
      return m.reply(`*Failed to get target vote kick. Try again later.*`);
    }
  } else {
    who = m.chat;
  }

  if (!who) {
    throw `*Example :* ${usedPrefix}${command} *@target*`;
  }
  if (who === isAdmin || who === conn.user.jid) {
    return m.reply("*What The Fuck*");
  }
  if (!conn.votekick[who]) {
    conn.votekick[who] = { vote: 0 };
  } else {
    conn.votekick[who].vote += 1;
  }

  if (conn.votekick[who].vote === 3) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [who], "remove");
      delete conn.votekick[who];
      m.reply(
        `*VOTE KICK MEMBER @${who.split("@")[0]}*\nHave been kicked from the group.`,
      );
    } catch (error) {
      console.error("Error kicking member:", error);
      m.reply(
        `*An error occurred when kicking members. Check bot permissions.*`,
      );
    }
  } else {
    m.reply(
      `*VOTE KICK MEMBER @${who.split("@")[0]}*\n*(${conn.votekick[who].vote}/3)* Vote again and they will be kicked from the group!`,
    );
  }
};

handler.help = ["votekick"]
handler.tags = ["group"];
handler.command = ["votekick"];
handler.botAdmin = true;
handler.group = true;

module.exports = handler;
