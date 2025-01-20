module.exports = {
  config: {
    name: "uptime",
    version: "1.0",
    author: "Aayusha",
    category: "utilities",
    description: "Shows how long the bot has been running",
  },

  onStart: async ({ message }) => {
    const uptime = process.uptime(); // Get uptime in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    message.reply(`I've been running for ${hours}h ${minutes}m ${seconds}s.`);
  },
};