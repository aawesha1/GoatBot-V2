const fs = require("fs");
module.exports.config = {
	name: "rick",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "SujanSir", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if(event.body.includes("Who is aawesh") || event.body.includes("who is aawesh") || event.body.includes("WHO IS AAWESH") || event.body.includes("WHO IS AAWESH"))  {
		var msg = {
				body: "insta [ aawexxh ]’‹",
			}
			api.sendMessage(msg, threadID, messageID);
  }
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }