const moneyPerLimit = 30000;

let handler = async (m, { conn, command, args }) => {
  let count;

  // Extract count based on command and arguments
  if (command) {
    count = command.replace(/^buylimit/i, "");
  }

  if (count) {
    if (/all/i.test(count)) {
      // Buy all possible limits (considering money and moneyPerLimit)
      count = Math.floor(global.db.data.users[m.sender].money / moneyPerLimit);
    } else {
      // Parse numeric count from command or argument
      count = parseInt(count) || parseInt(args[0]) || 1;
    }
  } else {
    // Default count to 1 if no command or argument is provided
    count = 1;
  }

  // Ensure positive count (avoid potential errors)
  count = Math.max(1, count);

  // Check for sufficient funds
  if (global.db.data.users[m.sender].money >= moneyPerLimit * count) {
    global.db.data.users[m.sender].money -= moneyPerLimit * count;
    global.db.data.users[m.sender].limit += count;

    // Send confirmation message with proper formatting
    conn.reply(m.chat, `-${moneyPerLimit * count} Money\n+${count} Limit`, m);
  } else {
    // Send informative message about insufficient funds
    conn.reply(
      m.chat,
      `Insufficient funds to buy ${count} limits. You need ${moneyPerLimit * count} Money, but you only have ${global.db.data.users[m.sender].money}.`,
      m,
    );
  }
};

handler.help = ["buylimit", "buylimitall"];
handler.tags = ["rpg"];
handler.command = ["buylimit", "buylimitall"];

module.exports = handler;
