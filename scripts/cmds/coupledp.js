const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "coupledp",
    aliases: ["coupledp"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "couple dp",
    },
    longDescription: {
      en: "couple dp",
    },
    category: "image",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const { data } = await axios.get("https://tanjiro-api.onrender.com/cdp?api_key=tanjiro");

      // Fetch images as binary
      const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
      const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });

      // Save images correctly
      const malePath = __dirname + "/tmp/img1.png";
      const femalePath = __dirname + "/tmp/img2.png";

      fs.writeFileSync(malePath, maleImg.data);
      fs.writeFileSync(femalePath, femaleImg.data);

      // Send message with attachments
      return api.sendMessage(
        {
          body: "Here is your couple dp",
          attachment: [fs.createReadStream(malePath), fs.createReadStream(femalePath)],
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error(error);
      return api.sendMessage("❌ Failed to fetch couple DP. Please try again later.", event.threadID);
    }
  },
};