let cp = require("child_process");
let { promisify } = require("util");
let exec = promisify(cp.exec).bind(cp);
let handler = async (m, { conn }) => {
  let o;
  try {
    o = await exec("cd && du -h --max-depth=1");
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim()) m.reply("```" + stdout + "```");
    if (stderr.trim()) m.reply("```" + stderr + "```");
  }
};
handler.help = ["disk"]
handler.tags = ["info"];
handler.command = ["disk"];
module.exports = handler;
