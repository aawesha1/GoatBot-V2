const path = require('path');

module.exports = {
  config: {
    name: Buffer.from("QWF5dXV1dQ==", "base64").toString("utf8"),
    version: Buffer.from("MS4w", "base64").toString("utf8"),
    author: Buffer.from("QWNlR3Vu", "base64").toString("utf8"),
    countDown: parseInt(Buffer.from("NQ==", "base64").toString("utf8")),
    role: parseInt(Buffer.from("MA==", "base64").toString("utf8")),
    shortDescription: Buffer.from("bm8gcHJlZml4", "base64").toString("utf8"),
    longDescription: Buffer.from("bm8gcHJlZml4", "base64").toString("utf8"),
    category: Buffer.from("bm8gcHJlZml4", "base64").toString("utf8")
  },

  onStart: async function() {},

  onChat: async function({ api, event, message, getLang }) {
    const triggerWord = Buffer.from("YWF3ZXNo", "base64").toString("utf8");
    const responseText = Buffer.from("dW5yZWFsLmFhd2V4aF8=", "base64").toString("utf8") + " 🤍😗";
    const reactionEmoji = String.fromCodePoint(0x1F90D);

    if (event.body && event.body.toLowerCase().includes(triggerWord)) {
      message.reply(responseText);
      api.setMessageReaction(reactionEmoji, event.messageID, () => {}, true);
    }
  }
};
