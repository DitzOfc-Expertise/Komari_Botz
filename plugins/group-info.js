let handler = async (m, { conn, text, usedPrefix, command, groupMetadata }) => {
  let data = groupMetadata;
  let pp = await conn.profilePictureUrl(m.chat, "image");
  let cap = `*${data.subject.toUpperCase()} INFOMATION*
*• ID :* *[ ${data.id} ]*
*• Owner Group :* @${data.owner.split("@")[0] || ""} *[ ${(await conn.getName(data.owner)) || ""} ]*
*• Total Member :* ${data.size}
*•  Accept New member :* ${data.joinApprovalMode ? "[ ✓ ]" : "[ x ]"}
*• Add Others Member :* ${data.memberAddMode ? "[ ✓ ]" : "[ x ]"}
*• Message Restrict :*  ${data.restrict ? "[ ✓ ]" : "[ x ]"}

${data.desc}
`;
  await conn.sendMessage(
    m.chat,
    {
      image: {
        url: pp,
      },
      caption: cap,
      mentions: await conn.parseMention(cap),
    },
    { quoted: m },
  );
};
handler.help = ["infogroup"]
handler.tags = ["group"];
handler.command = ["infogroup"];
handler.group = true;

module.exports = handler;
