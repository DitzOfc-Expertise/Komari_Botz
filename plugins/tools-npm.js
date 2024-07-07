let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} package_name`;
  let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
  let { objects } = await res.json();
  if (!objects.length) throw `Query "${text}" Not found, Please check package name is correct`;
  let txt = objects.map(({ package: pkg }) => {
    return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`;
  }).join`\n\n`;
  m.reply(txt);
};
handler.help = ["npmsearch", "npm"]
handler.tags = ["tools"];
handler.command = /^npm(js|search)?$/i;

module.exports = handler;
