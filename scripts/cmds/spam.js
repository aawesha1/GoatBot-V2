const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: Buffer.from("c3BhbQ==", "base64").toString("utf8"),
    version: Buffer.from("MS4w", "base64").toString("utf8"),
    author: Buffer.from("WW91ck5hbWU=", "base64").toString("utf8"),
    countDown: parseInt(Buffer.from("NQ==", "base64").toString("utf8")),
    role: parseInt(Buffer.from("Mg==", "base64").toString("utf8")),
    shortDescription: Buffer.from("U3BhbSBhIG1lc3NhZ2U=", "base64").toString("utf8"),
    longDescription: Buffer.from("U2VuZCB0aGUgcHJvdmlkZWQgbWVzc2FnZSBtdWx0aXBsZSB0aW1lcyB3aXRoIGEgY3VzdG9taXphYmxlIGFtb3VudC4=", "base64").toString("utf8"),
    category: Buffer.from("VXRpbGl0eQ==", "base64").toString("utf8")
  },

  onStart: async function() {},

  onChat: async function({ event, api }) {
    const triggerWord = Buffer.from("I3NwYW0=", "base64").toString("utf8");
    const stopWord = Buffer.from("I3N0b3BzcGFt", "base64").toString("utf8");
    const doneMessage = Buffer.from("U3BhbW1lZCB7fSBNZXNzYWdlcyBieSBNaXNzIEFheXVzZSE=", "base64").toString("utf8");
    const errorText = Buffer.from("VGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIHNwYW1taW5nIG1lc3NhZ2VzLg==", "base64").toString("utf8");

    if (event.body && event.body.toLowerCase().includes(stopWord)) {
      api.sendMessage(Buffer.from("U3RvcHBpbmcgdGhlIHNwYW0gY29tbWFuZC4=", "base64").toString("utf8"), event.threadID);
      return;
    }

    if (event.body && event.body.toLowerCase().startsWith(triggerWord)) {
      try {
        let parts = event.body.slice(triggerWord.length).trim().split(" ");
        let messageToSpam = parts.slice(0, -1).join(" ");
        let amount = parseInt(parts[parts.length - 1]);

        if (!messageToSpam || isNaN(amount) || amount <= 0) {
          return api.sendMessage(Buffer.from("UGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBtZXNzYWdlIGFuZCBhbW91bnQuIEV4YW1wbGU6ICNz" +
          "cGFtIGhlbGxvIDEw", "base64").toString("utf8"), event.threadID);
        }

        let spamCount = 0;
        const spamInterval = setInterval(() => {
          if (spamCount >= amount) {
            clearInterval(spamInterval);
            api.sendMessage(doneMessage.replace("{}", amount), event.threadID);
            return;
          }
          api.sendMessage(messageToSpam, event.threadID);
          spamCount++;
        }, 100);
      } catch (error) {
        api.sendMessage(errorText, event.threadID);
      }
    }
  }
};