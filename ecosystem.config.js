module.exports = {
  apps : [
    {
    name: 'elginbot',
    script: './Structures/bot.js',
    watch: true,
    ignore_watch: ["logs", "node_modules"]
  }, {
    name: 'youtubebot',
    script: './Structures/Youtube/youtubeNotify.js',
    watch: true,
    ignore_watch: ["logs", "node_modules"]
  }],
};
