const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;

module.exports = {
  config: {
    name: "setwelcome",
    aliases: ["setwc"],
    version: "1.7",
    author: "NTKhang",
    countDown: 5,
    role: 1,
    description: {
      en: "Edit welcome message content when a new member joins your group chat",
    },
    category: "custom",
    guide: {
      en: {
        body: "   {pn} text [<content> | reset]: edit text content or reset to default, with some shortcuts:"
          + "\n  + {userName}: name of the new member"
          + "\n  + {userNameTag}: taggable name of the new member"
          + "\n  + {boxName}: group chat name"
          + "\n  + {multiple}: you || you guys (context-based)"
          + "\n  + {session}: time of day (morning, afternoon, etc.)"
          + "\n\n   Example:"
          + "\n    {pn} text--» Hello {userNameTag},--» Welcome to our {boxName},--» have a nice day {multiple}"
          + "\n"
          + "\n   Reply or send a message with {pn} file: to add file attachments to the welcome message (image, video, audio)"
          + "\n\n   Example:"
          + "\n    {pn} file reset: delete all file attachments",
        attachment: {
          [`${__dirname}/assets/guide/setwelcome/setwelcome_en_1.png`]: "https://i.ibb.co/vsCz0ks/setwelcome-en-1.png"
        }
      }
    }
  },

  langs: {
    en: {
      turnedOn: "Turned on welcome message",
      turnedOff: "Turned off welcome message",
      missingContent: "Please enter the welcome message content",
      edited: "Edited the welcome message content for your group to: %1",
      reseted: "Reset the welcome message content",
      noFile: "No file attachments to delete",
      resetedFile: "Reset file attachments successfully",
      missingFile: "Please reply to this message with an image/video/audio file",
      addedFile: "Added %1 file attachment(s) to your group's welcome message"
    }
  },

  onStart: async function ({ args, threadsData, message, event, commandName, getLang }) {
    const { threadID, senderID, body } = event;
    const { data, settings } = await threadsData.get(threadID);

    switch (args[0]) {
      case "text": {
        if (!args[1])
          return message.reply(getLang("missingContent"));
        else if (args[1] == "reset")
          delete data.welcomeMessage;
        else
          data.welcomeMessage = body.slice(body.indexOf(args[0]) + args[0].length).trim();
        await threadsData.set(threadID, { data });
        message.reply(data.welcomeMessage ? getLang("edited", data.welcomeMessage) : getLang("reseted"));
        break;
      }
      case "file": {
        if (args[1] == "reset") {
          const { welcomeAttachment } = data;
          if (!welcomeAttachment)
            return message.reply(getLang("noFile"));
          try {
            await Promise.all(data.welcomeAttachment.map(fileId => drive.deleteFile(fileId)));
            delete data.welcomeAttachment;
          } catch (e) { }
          await threadsData.set(threadID, { data });
          message.reply(getLang("resetedFile"));
        } else if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
          return message.reply(getLang("missingFile"), (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              messageID: info.messageID,
              author: senderID,
              commandName
            });
          });
        else {
          saveChanges(message, event, threadID, senderID, threadsData, getLang);
        }
        break;
      }
      case "on":
      case "off": {
        settings.sendWelcomeMessage = args[0] == "on";
        await threadsData.set(threadID, { settings });
        message.reply(settings.sendWelcomeMessage ? getLang("turnedOn") : getLang("turnedOff"));
        break;
      }
      default:
        message.SyntaxError();
        break;
    }
  },

  onReply: async function ({ event, Reply, message, threadsData, getLang }) {
    const { threadID, senderID } = event;
    if (senderID != Reply.author)
      return;

    if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
      return message.reply(getLang("missingFile"));
    saveChanges(message, event, threadID, senderID, threadsData, getLang);
  }
};

async function saveChanges(message, event, threadID, senderID, threadsData, getLang) {
  const { data } = await threadsData.get(threadID);
  const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", "animated_image", "video", "audio"].includes(item.type));
  if (!data.welcomeAttachment)
    data.welcomeAttachment = [];

  await Promise.all(attachments.map(async attachment => {
    const { url } = attachment;
    const ext = getExtFromUrl(url);
    const fileName = `${getTime()}.${ext}`;
    const infoFile = await drive.uploadFile(`setwelcome_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
    data.welcomeAttachment.push(infoFile.id);
  }));

  await threadsData.set(threadID, { data });
  message.reply(getLang("addedFile", attachments.length));
}