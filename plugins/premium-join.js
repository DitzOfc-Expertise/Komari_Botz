let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text }) => {
  let [_, code] = text.match(linkRegex) || [];
  if (!code) throw "*• Example :* .join Group Link";
  try {
    const res = await conn.groupAcceptInvite(code);
  } catch (e) {
    throw `Error`;
  } finally {
    m.reply(
      `Success Join To Group : *[ ${(await conn.groupGetInviteInfo(code)).id} ]*`,
    );
  }
};
handler.help = ["join"].map((a) => a + " *[premium only]*");
handler.tags = ["premium"];
handler.command = ["join"];
handler.premium = true;

module.exports = handler;
