const WebSocket = require("ws");
const fs = require("fs");

let wss = "wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join";

function generateRandomLetters(length) {
  let result = "";
  const alphabetLength = 26;

  for (let i = 0; i < length; i++) {
    const randomValue = Math.floor(Math.random() * alphabetLength);
    const randomLetter = String.fromCharCode("a".charCodeAt(0) + randomValue);
    result += randomLetter;
  }

  return result;
}

/*

Scraper by YanzBotz 
Claim gw ewe luh

*/

exports.kobo = async (audio) => {
  return new Promise(async (resolve, reject) => {
    let name =
      Math.floor(Math.random() * 100000000000000000) +
      (await generateRandomLetters()) +
      ".mp4";
    let result = {};
    let send_has_payload = {
      fn_index: 2,
      session_hash: "xyuk2cf684b",
    };
    let send_data_payload = {
      fn_index: 2,
      data: [
        {
          data: "data:audio/mpeg;base64," + audio.toString("base64"),
          name: name,
        },
        0,
        "pm",
        0.6,
        false,
        "",
        "en-US-AnaNeural-Female",
      ],
      event_data: null,
      session_hash: "xyuk2cf684b",
    };
    const ws = new WebSocket(wss);
    ws.onopen = function () {
      console.log("Connected to websocket");
    };

    ws.onmessage = async function (event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case "send_hash":
          ws.send(JSON.stringify(send_has_payload));
          break;

        case "send_data":
          console.log("Processing your audio....");
          ws.send(JSON.stringify(send_data_payload));
          break;
        case "process_completed":
          result.base64 =
            "https://yanzbotz-waifu-yanzbotz.hf.space/file=" +
            message.output.data[1].name;
          break;
      }
    };

    ws.onclose = function (event) {
      if (event.code === 1000) {
        console.log("Process completed️");
      } else {
        msg.reply("Err : WebSocket Connection Error:\n");
      }
      resolve(result);
    };
  });
};
