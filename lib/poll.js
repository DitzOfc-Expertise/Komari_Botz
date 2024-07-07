let crypto = require("crypto");
const enc = new TextEncoder();

/*
Array options 
Array pollHash 
*/

async function toHex(text) {
  return Buffer.from(
    await crypto.webcrypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(text),
    ),
  )
    .toString("hex")
    .toUpperCase();
}

async function compare(options, pollHash) {
  const selectedOptions = [];
  for (let option of options) {
    const hash = await toHex(option);
    for (let pollOptionHash of pollHash) {
      if (pollOptionHash.toString() == hash.toString()) {
        selectedOptions.push(option);
      }
    }
  }
  return selectedOptions;
}

/*
Uint8Array encPayload
Uint8Array encIv
Uint8Array additionalData
Uint8Array decryptionKey
*/

async function _decryptMessage(
  encPayload,
  encIv,
  additionalData,
  decryptionKey,
) {
  const tagSize_multiplier = 16;
  const encoded = encPayload;
  const key = await crypto.webcrypto.subtle.importKey(
    "raw",
    decryptionKey,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"],
  );
  const decrypted = await crypto.webcrypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: encIv,
      additionalData: additionalData,
      tagLength: 8 * tagSize_multiplier,
    },
    key,
    encoded,
  );
  return new Uint8Array(decrypted).slice(2); // remove 2 bytes (OA20)(space+newline)
}

/*
Uint8Array decryptedMessage
*/

async function _decodeMessage(decryptedMessage) {
  const n = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
  const outarr = [];
  for (let i = 0; i < decryptedMessage.length; i++) {
    const val = decryptedMessage[i];
    outarr.push(n[val >> 4], n[15 & val]);
  }
  return String.fromCharCode(...outarr);
}

/*
Uint8Array encKey
Uint8Array encPayload
Uint8Array encIv
String pollMsgSender
String pollMsgId
String voteMsgSender
*/

async function decrypt(
  encKey,
  encPayload,
  encIv,
  pollMsgSender,
  pollMsgId,
  voteMsgSender,
) {
  try {
    const stanzaId = enc.encode(pollMsgId);
    const parentMsgOriginalSender = enc.encode(pollMsgSender);
    const modificationSender = enc.encode(voteMsgSender);
    const modificationType = enc.encode("Poll Vote");
    const pad = new Uint8Array([1]);

    const signMe = new Uint8Array([
      ...stanzaId,
      ...parentMsgOriginalSender,
      ...modificationSender,
      ...modificationType,
      pad,
    ]); // as any
    const createSignKey = async (n = new Uint8Array(32)) => {
      return await crypto.webcrypto.subtle.importKey(
        "raw",
        n,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
    };
    const sign = async (n, key) => {
      return await crypto.webcrypto.subtle.sign(
        { name: "HMAC", hash: "SHA-256" },
        key,
        n,
      );
    };

    let key = await createSignKey();
    const temp = await sign(encKey, key);
    key = await createSignKey(new Uint8Array(temp));
    const decryptionKey = new Uint8Array(await sign(signMe, key));

    const additionalData = enc.encode(`${pollMsgId}\u0000${voteMsgSender}`);
    const decryptedMessage = await _decryptMessage(
      encPayload,
      encIv,
      additionalData,
      decryptionKey,
    );
    const pollOptionHash = await _decodeMessage(decryptedMessage);

    // '0A20' in hex represents unicode " " and "\n" thus declaring the end of one option
    // we want multiple hashes to make it easier to iterate and understand for your use cases
    return pollOptionHash.split("0A20") || [];
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  toHex,
  compare,
  _decryptMessage,
  _decodeMessage,
  decrypt,
};
