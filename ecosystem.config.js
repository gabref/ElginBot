module.exports = {
  apps : [
    {
    name: 'elginbot',
    script: './Structures/bot.js',
    watch: false
  }, {
    name: 'youtubebot',
    script: './Structures/Youtube/youtubeNotify.js',
    watch: false
  }],
};
