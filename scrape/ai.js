const WebSocket = require("ws");
const axios = require("axios");
const cheerio = require("cheerio");

function generateRandomUserAgent() {
  const androidVersions = [
    "4.0.3",
    "4.1.1",
    "4.2.2",
    "4.3",
    "4.4",
    "5.0.2",
    "5.1",
    "6.0",
    "7.0",
    "8.0",
    "9.0",
    "10.0",
    "11.0",
  ];
  const deviceModels = [
    "M2004J19C",
    "S2020X3",
    "Xiaomi4S",
    "RedmiNote9",
    "SamsungS21",
    "GooglePixel5",
  ];
  const buildVersions = [
    "RP1A.200720.011",
    "RP1A.210505.003",
    "RP1A.210812.016",
    "QKQ1.200114.002",
    "RQ2A.210505.003",
  ];
  const selectedModel =
    deviceModels[Math.floor(Math.random() * deviceModels.length)];
  const selectedBuild =
    buildVersions[Math.floor(Math.random() * buildVersions.length)];
  const chromeVersion =
    "Chrome/" +
    (Math.floor(Math.random() * 80) + 1) +
    "." +
    (Math.floor(Math.random() * 999) + 1) +
    "." +
    (Math.floor(Math.random() * 9999) + 1);
  const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
  return userAgent;
}

function generateRandomIP() {
  const octet = () => Math.floor(Math.random() * 256);
  return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function talkai(type, message) {
  try {
    const headers = {
      "User-Agent": generateRandomUserAgent(),
      Referer: "https://talkai.info/id/chat/",
      "X-Forwarded-For": generateRandomIP(),
    };

    const data = {
      temperature: 1,
      frequency_penalty: 0,
      type: type,
      messagesHistory: [
        {
          from: "chatGPT",
          content:
            "Nama ku akiraa aku adalah maskot dari TalkAi sedang bisa membantu mu 😋👍",
        },
        {
          from: "you",
          content: message,
        },
      ],
      message: message,
    };

    let response;

    try {
      response = await axios.post("https://talkai.info/id/chat/send/", data, {
        headers,
      });
    } catch (sendError) {
      console.error(
        'Error with "send" request. Falling back to "send2".',
        sendError,
      );
      // If "send" fails, try "send2"
      response = await axios.post("https://talkai.info/id/chat/send2/", data, {
        headers,
      });
    }

    return response.data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}
async function BlackBox(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const danz = await axios.post(
        "https://www.useblackbox.io/chat-request-v4",
        {
          text: text,
          allMessages: [
            {
              user: text,
            },
          ],
          stream: "",
          clickedContinue: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/71.3",
          },
        },
      );
      resolve(danz.data);
    } catch (e) {
      reject(e);
    }
  });
}
const soVits = {
  model: async (number) => {
    return new Promise(async (resolve) => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/ArifzynXD/database/master/ai/anime.json",
      );
      const model = data.model[number.toString()];

      if (model) {
        resolve(model);
      } else {
        resolve(data);
      }
    });
  },
  language: async (id) => {
    return new Promise(async (resolve) => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/ArifzynXD/database/master/ai/anime.json",
      );
      const lang = data.language[id.toString()];

      if (lang) {
        resolve(lang);
      } else {
        resolve(data);
      }
    });
  },
  generate: async (text, model_id, language) => {
    return new Promise(async (resolve, reject) => {
      const model = await this.model(model_id);
      const lang = await this.language(language);

      const send_hash = {
        session_hash: "4odx020bres",
        fn_index: 2,
      };
      const send_data = {
        fn_index: 2,
        data: [text, model, lang, 1, false],
        session_hash: "4odx020bres",
      };
      const result = {};

      const ws = new WebSocket(
        "wss://plachta-vits-umamusume-voice-synthesizer.hf.space/queue/join",
      );

      ws.onopen = function () {
        console.log("Connected to websocket");
      };

      ws.onmessage = async function (event) {
        let message = JSON.parse(event.data);
        switch (message.msg) {
          case "send_hash":
            ws.send(JSON.stringify(send_hash));
            break;
          case "estimation":
            console.log("Menunggu antrean: ️" + message.rank);
            break;
          case "send_data":
            console.log("Processing your audio....");
            ws.send(JSON.stringify(send_data));
            break;
          case "process_completed":
            result.url =
              "https://plachta-vits-umamusume-voice-synthesizer.hf.space/file=" +
              message.output.data[1].name;
            break;
        }
      };

      ws.onclose = function (event) {
        if (event.code === 1000) {
          console.log("Process completed️");
        } else {
          console.log("Err : WebSocket Connection Error:\n");
        }
        resolve(result);
      };
    });
  },
};
async function imgToPrompt(url) {
  try {
    const response = await fetch(url);
    const imageData = await response.buffer();
    const imageBase64 = Buffer.from(imageData).toString("base64");

    const payload = {
      consume_points: 1,
      image: imageBase64,
    };

    const headers = {
      "Content-Type": "application/json",
      Cookie:
        "_ga=GA1.1.1902043976.1711876868; _ga_WQ0WB7ZY96=GS1.1.1711876868.1.1.1711877146.0.0.0",
      Origin: "https://animegenius.live3d.io",
      Referer: "https://animegenius.live3d.io/",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTI5MTQyMTIsInN1YiI6Imdvb2dsZSAxNjEzMTIzIGdlbnR1cnN5MDJAZ21haWwuY29tIn0.niSNoUYnECi7nKdY9BObDHAt_EX-FsLcdhxfoUCWbbs",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    };

    const result = await fetch(
      "https://api.live3d.io/api/v1/generation/img2prompt",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      },
    );

    const responseData = await result.json();
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    return null;
  }
}
module.exports = {
  talkai,
  BlackBox,
  soVits,
  imgToPrompt,
};

let fs = require("fs");
let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update scrape"));
  delete require.cache[file];
  require(file);
});
