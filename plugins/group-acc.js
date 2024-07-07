let handler = async (m, { conn, args }) => {
  const groupId = m.chat;
  const [subCommand, options] = args;
  const joinRequestList = await conn.groupRequestParticipantsList(groupId);

  const formatDate = (timestamp) =>
    new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(timestamp * 1000));
  switch (subCommand) {
    case "list":
      const formattedList =
        joinRequestList.length > 0
          ? joinRequestList
              .map(
                (request, i) =>
                  `*${i + 1}.*\n• Nomor: ${request.jid.split("@")[0]}\n• Metode Permintaan: ${request.request_method}\n• Waktu Permintaan: ${formatDate(request.request_time)}\n\n`,
              )
              .join("")
          : "Tidak ada permintaan bergabung yang tertunda.";
      reply(`*Daftar Permintaan Bergabung:*\n\n${formattedList}`);
      break;

    case "reject":
    case "approve":
      if (options === "all") {
        for (const request of joinRequestList) {
          await conn.groupRequestParticipantsUpdate(
            groupId,
            [request.jid],
            subCommand,
          );
          console.log(
            `Meng-${subCommand} participant dengan JID: ${request.jid}`,
          );
        }
        reply(
          `*${subCommand === "approve" ? "Menyetujui" : "Menolak"} semua permintaan bergabung.*`,
        );
      } else {
        const actions = options.split("|").map((action) => action.trim());
        const participants = actions
          .map((action) => joinRequestList[parseInt(action) - 1])
          .filter((request) => request);
        if (participants.length > 0) {
          let formattedResponse = "";
          for (const request of participants) {
            const response = await conn.groupRequestParticipantsUpdate(
              groupId,
              [request.jid],
              subCommand,
            );
            const status =
              response[0].status === "success" ? "Berhasil" : "Gagal";
            formattedResponse += `*${participants.indexOf(request) + 1}.*\n• Status: ${status}\n• Nomor: ${request.jid.split("@")[0]}\n\n`;
            console.log(
              `Meng-${subCommand} participant dengan JID: ${request.jid}`,
            );
          }
          reply(
            `*${subCommand === "approve" ? "Menyetujui" : "Menolak"} Permintaan Bergabung:*\n\n${formattedResponse}`,
          );
        } else {
          reply("Tidak ada anggota yang cocok untuk reject/approve.");
        }
      }
      break;

    default:
      m.reply(`*[ HOW TO USE ]*
> • _*${usedPrefix + command} list : untuk melihat list orang yang ingin bergabung_
> • _*${usedPrefix + command} approve [all] :* untuk menyetujui permintaan bergabung seseorang_
> • _*${usedPrefix + command} reject [all] :* untuk menolak permintaan bergabung seseorang_`);
  }
};

handler.help = ["acc", "reqjoin"].map((a) => a + " *[options]*");
handler.tags = ["group"];
handler.command = ["acc", "reqjoin"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;
