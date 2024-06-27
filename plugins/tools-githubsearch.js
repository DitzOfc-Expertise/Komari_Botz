let fetch = require("node-fetch");
let handler = async (m, { text }) => {
  if (!text) throw "*• Example :* .githubsearch *[repository name]*";
  let res = await fetch(
    global.API("https://api.github.com", "/search/repositories", {
      q: text,
    }),
  );
  let json = await res.json();
  if (res.status !== 200) throw json;
  let str = json.items
    .map((repo, index) => {
      return `
${1 + index}. *${repo.full_name}*${repo.fork ? " (fork)" : ""}
_${repo.html_url}_
_Created at *${formatDate(repo.created_at)}*_
_Last update on *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${
        repo.description
          ? `
*Description:*\n${repo.description}`
          : ""
      }
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim();
    })
    .join("\n\n");
  m.reply(str);
};
handler.help = ["githubsearch"]
handler.tags = ["tools"];
handler.command = ["githubsearch"];

handler.register = true;
handler.limit = true;

module.exports = handler;

function formatDate(n, locale = "id") {
  let d = new Date(n);
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
