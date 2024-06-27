let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
  let image = `https://skizo.tech/tmp/zYKJQ1713270422856.jpg`;
  let catalogs = global.db.data.catalog || [];

  switch (command) {
    case "store":
      let caption = "";
      for (let catalog of catalogs) {
        caption += `• *${catalog.name.toUpperCase()}*\n`;
        for (let item of catalog.items) {
          caption += `  ◦ ${item.name} - Rp${item.price}\n`;
        }
        caption += "\n";
      }
      conn.sendFile(m.chat, image, "store.jpg", caption, m);
      break;

    case "addcatalog":
      if (!isOwner) return dfail("owner", m, conn);
      if (!text) throw `*• Example :* ${usedPrefix + command} *[name catalog]*`;
      let newCatalog = { name: text.toLowerCase(), items: [] };
      catalogs.push(newCatalog);
      global.db.data.catalog = catalogs;
      conn.reply(
        m.chat,
        "*[ ✓ ] The new catalog has been successfully addedn*",
        m,
      );
      break;
    case "delcatalog":
      if (!isOwner) return dfail("owner", m, conn);
      if (!text) throw `*• Example :* ${usedPrefix + command} *[name catalog]*`;
      let indexCatalog = catalogs.findIndex(
        (catalog) => catalog.name.toLowerCase() === text.toLowerCase(),
      );
      if (indexCatalog !== -1) {
        catalogs.splice(indexCatalog, 1);
        global.db.data.catalog = catalogs;
        conn.reply(m.chat, "*[ ✓ ] Catalog successfully deleted*", m);
      } else {
        conn.reply(m.chat, "*[ ! ] Catalog not found*", m);
      }
      break;

    case "additem":
      if (!isOwner) return dfail("owner", m, conn);
      if (!text)
        throw `*• Example :* ${usedPrefix + command} *[name item | info price | name catalog]*`;
      let [name, price, catalogName] = text.split("|").map((v) => v.trim());
      if (!(name && price && catalogName))
        throw `*• Example :* ${usedPrefix + command} *[name item | info price | name catalog]*`;
      let catalog = catalogs.find(
        (catalog) => catalog.name.toLowerCase() === catalogName.toLowerCase(),
      );
      if (catalog) {
        if (isNaN(parseInt(price)))
          return conn.reply(m.chat, "*[ ! ] Prices must be numbers*", m);
        if (parseInt(price) < 0)
          return conn.reply(m.chat, "*[ ! ] Price cannot be less than 0", m);
        catalog.items.push({ name, price: parseInt(price) });
        global.db.data.catalog = catalogs;
        conn.reply(m.chat, "*[ ✓ ] New item successfully added to catalog*", m);
      } else {
        conn.reply(m.chat, "*[ ! ] Catalog not found*", m);
      }
      break;

    case "delitem":
      if (!isOwner) return dfail("owner", m, conn);
      if (!text)
        throw `*• Example :* ${usedPrefix + command} *[name item | name catalog]*`;
      let [itemName, delCatalogName] = text.split("|").map((v) => v.trim());
      let delCatalog = catalogs.find(
        (catalog) =>
          catalog.name.toLowerCase() === delCatalogName.toLowerCase(),
      );
      if (delCatalog) {
        let indexItem = delCatalog.items.findIndex(
          (item) => item.name.toLowerCase() === itemName.toLowerCase(),
        );
        if (indexItem !== -1) {
          delCatalog.items.splice(indexItem, 1);
          global.db.data.catalog = catalogs;
          conn.reply(
            m.chat,
            "*[ ✓ ] Item successfully removed from catalog*",
            m,
          );
        } else {
          conn.reply(m.chat, "*[ ! ] Item not found in catalog*", m);
        }
      } else {
        conn.reply(m.chat, "*[ ✓ ] Catalog not found*", m);
      }
      break;
  }
};

handler.help = [
  "store",
  "addcatalog *[name catslog]*",
  "delcatalog *[name catalog]*",
  "additem *[name item | info price | name catalog]*",
  "delitem *[name item | name catalog]*",
];
handler.tags = ["store"];

handler.command = ["store", "addcatalog", "delcatalog", "additem", "delitem"];

module.exports = handler;
