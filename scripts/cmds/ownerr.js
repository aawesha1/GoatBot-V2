const fs = require("fs");

module.exports = {
  config: {
    name: "Ownerrr",
    version: "1.0",
    author: "Aayusha",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, api, getLang }) {
    if (event.body && event.body.toLowerCase().includes("owner")) {
      try {
        // If you change credit you are gayy - Aayuse!!
        api.setMessageReaction("😍", event.messageID, () => {}, true);

        return message.reply({
          body: "Hi, I am Shreyaa. Developed by Miss Aàyusha and Aawesh.🤍🌿",
          attachment: fs.createReadStream("owner.png")
        });
      } catch (error) {
        console.error("Error setting reaction or sending reply:", error);
      }
    }
  }
  
