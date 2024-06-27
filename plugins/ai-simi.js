const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    throw `*• Example:* ${usedPrefix + command} pertanyaan`;
  }
  try {
    const simiResponse = await fetch(
      `https://itzpire.site/ai/simi-chat?lang=id&text=${text}&toxic=true`,
    );
    const simiData = await simiResponse.json();
    let hasil = ` *[ 💬 ]* ${simiData.result}`;
    m.reply(hasil);
  } catch (e) {
    throw "Error bos! eak";
  }
};

handler.help = ["simi", "chatbot"].map((a) => a + "pertanyaan");
handler.tags = ["ai"];
handler.command = ["simi", "chatbot"];
handler.premium = false;

module.exports = handler;
