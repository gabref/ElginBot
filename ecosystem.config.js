module.exports = {
  apps : [
    {
    name: 'elginbot',
    script: './Structures/bot.js',
    watch: true
  }, {
    name: 'youtubebot',
    script: './Structures/Youtube/youtubeNotify.js',
    watch: true
  }],
};
