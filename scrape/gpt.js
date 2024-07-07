let fetch = require("node-fetch");

async function ChatGpt(input) {
  const messages = [
    {
      role: "system",
      content:
        "Kamu Adalah shinomiya kaguya dari anime love is war, seorang siswi sma sekaligus wakil ketua osis",
    },
    { role: "user", content: input },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
async function gptpic(captionInput) {
  const data = {
    captionInput,
    captionModel: "default",
  };

  const url = "https://chat-gpt.pictures/api/generateImage";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
const SeaArt = async (prompt) => {
  try {
    const requestData = {
      page: 1,
      page_size: 40,
      order_by: "new",
      type: "community",
      keyword: prompt,
      tags: [],
    };
    const response = await fetch("https://www.seaart.ai/api/v1/artwork/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    const items = data.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items found.");
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
async function Lbbai(sistem, input) {
  const messages = [
    { role: "system", content: input },
    { role: "user", content: sistem },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

module.exports = {
  ChatGpt,
  gptpic,
  SeaArt,
  Lbbai,
};

let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update gpt.js");
  delete require.cache[file];
  require(file);
});
