const fs = require('fs');
const path = require('path');

function decode(input) {
  return Buffer.from(input, "base64").toString("utf8");
}

module.exports = {
  config: {
    name: decode(from("c3BhbQ==", "utf8").toString("base64")),
    version: decode(from("MS4w", "utf8").toString("base64")),
    author: decode(from("WW91ck5hbWU=", "utf8").toString("base64")),
    countDown: parseInt(decode(from("NQ==", "utf8").toString("base64"))),
    role: parseInt(decode(from("Mg==", "utf8").toString("base64"))),
    shortDescription: decode(
      from("U3BhbSBhIG1lc3NhZ2U=", "utf8").toString("base64")
    ),
    longDescription: decode(
      from(
        "U2VuZCB0aGUgcHJvdmlkZWQgbWVzc2FnZSBtdWx0aXBsZSB0aW1lcyB3aXRoIGEgY3VzdG9taXphYmxlIGFtb3VudC4=",
        "utf8"
      ).toString("base64")
    ),
    category: decode(from("VXRpbGl0eQ==", "utf8").toString("base64")),
  },

  onStart: async function () {
    // Any initialization needed can go here
  },

  onChat: async function ({ event, api }) {
    const stopSpamCommand = decode(from("LnN0b3BzcGFt", "utf8").toString("base64"));
    const spamCommand = decode(from("LnNwYW0g", "utf8").toString("base64"));

    const { threadID, messageID } = event;

    if (event.body && event.body.toLowerCase().includes(stopSpamCommand)) {
      api.sendMessage(decode(from("U3RvcHBpbmcgdGhlIHNwYW0gY29tbWFuZC4=", "utf8").toString("base64")), threadID);
      return;
    }

    if (event.body && event.body.toLowerCase().startsWith(spamCommand)) {
      try {
        const parts = event.body.slice(spamCommand.length).split(" ");
        const messageToSpam = parts.slice(0, parts.length - 1).join(" ");
        const amount = parseInt(parts[parts.length - 1]);

        if (!messageToSpam || isNaN(amount) || amount <= 0) {
          return api.sendMessage(
            decode(from("UGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBtZXNzYWdlIGFuZCBhbW91bnQuIEV4YW1wbGU6IC5zcGFtIGhlbGxvIDEw", "utf8").toString("base64")),
            threadID
          );
        }

        let spamCount = 0;
        const sendMessage = (msg) => api.sendMessage(msg, threadID);

        const spamInterval = setInterval(() => {
          if (spamCount >= amount) {
            clearInterval(spamInterval);
            console.log(
              decode(from("RmluaXNoZWQgc3BhbW1pbmc=", "utf8").toString("base64")) +
              ` ${amount} ` +
              decode(from("bWVzc2FnZXMu", "utf8").toString("base64"))
            );
            api.sendMessage(
              `Done!! ${decode(
                from("U3BhbW1lZCA=", "utf8").toString("base64")
              )}${amount} ${decode(
                from("TWVzc2FnZXM=", "utf8").toString("base64")
              )}💬✅.`,
              threadID
            );
            return;
          }

          console.log(decode(from("U2VuZGluZyBzcGFtIG1lc3NhZ2U=", "utf8").toString("base64")) + ` ${spamCount + 1}`);
          sendMessage(messageToSpam);
          spamCount++;
        }, 100);
        console.log(decode(from("U3RhcnRlZCBzcGFtbWluZzo=", "utf8").toString("base64")) + ` "${messageToSpam}" ${amount} ` + decode(from("dGltZXM=", "utf8").toString("base64")));
      } catch (error) {
        console.error(decode(from("RXJyb3IgZHVyaW5nIHNwYW0gZXhlY3V0aW9uOg==", "utf8").toString("base64")), error);
        api.sendMessage(decode(from("VGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIHNwYW1taW5nIG1lc3NhZ2VzLg==", "utf8").toString("base64")), threadID);
      }
    }
  },
};