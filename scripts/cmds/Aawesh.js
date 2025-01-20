let lastReplyIndexAayusha = null;
let lastReplyIndexAyusha = null;

module.exports = {
  config: {
    name: "callAakash",
    version: "1.0",
    author: "Aayusha",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function () {},

  onChat: async function ({ event, message, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;
      const ment = [{ id: id, tag: name }];

      // Helper function to get a random reply without repetition
      const getRandomReply = (replies, lastIndex) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * replies.length);
        } while (newIndex === lastIndex && replies.length > 1);
        return { reply: replies[newIndex], index: newIndex };
      };

      // Replies for "hello"
      if (event.body && event.body.toLowerCase().includes("hello")) {
        const repliesForAayusha = [
          `${name}, Hello!`,
          `Hi ${name}, how can I help you?`,
          `${name}, Have a good day!`,
          `${name}, 🙋‍♂️`,
          `${name}! Hello Boss!!`,
        ];

        const { reply, index } = getRandomReply(repliesForAayusha, lastReplyIndexAayusha);
        lastReplyIndexAayusha = index;

        api.setMessageReaction("💬", event.messageID, () => {}, true);

        return message.reply({
          body: reply,
          mentions: ment,
        });
      }

      // Replies for "hi"
      if (event.body && event.body.toLowerCase().includes("hi")) {
        const repliesForAyusha = [
          `Hi ${name}, how are you? What can I help you with? Have a nice day too! 😉`,
        ];

        const { reply, index } = getRandomReply(repliesForAyusha, lastReplyIndexAyusha);
        lastReplyIndexAyusha = index;

        api.setMessageReaction("💬", event.messageID, () => {}, true);

        return message.reply({
          body: reply,
          mentions: ment,
        });
      }
    } catch (error) {
      console.error("Error setting reaction or sending reply:", error);
    }
  },
};