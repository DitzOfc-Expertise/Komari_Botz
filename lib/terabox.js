const axios = require("axios");

async function getLink(payload) {
  let download = await axios
    .post("https://terabox-dl.qtcloud.workers.dev/api/get-download", payload)
    .catch((e) => e.response);
  return download.data?.downloadLink;
}

async function terabox(url) {
  let id = (url.split(/surl=|\/s\//) || [])[1];
  id = `1${id.replace(/^1/, "")}`;

  let info = await axios
    .get(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${id}`)
    .catch((e) => e.response);
  if (info.status !== 200) throw info.statusText;

  info = info.data;
  if (!info.ok) throw info.message;

  for (let file of info.list) {
    if (file.children.length)
      for (let child of file.children) {
        let dlUrl = await getLink({
          shareid: info.shareid,
          uk: info.uk,
          sign: info.sign,
          timestamp: info.timestamp,
          fs_id: child.fs_id,
        });
        child.downloadLink = dlUrl;
      }
    else {
      let dlUrl = await getLink({
        shareid: info.shareid,
        uk: info.uk,
        sign: info.sign,
        timestamp: info.timestamp,
        fs_id: file.fs_id,
      });
      file.downloadLink = dlUrl;
    }
  }

  return info;
}

return JSON.stringify(
  await terabox("https://terabox.com/s/1MWrptrZqbFM_H1rnB3q_Dg"),
  "",
  2,
);
