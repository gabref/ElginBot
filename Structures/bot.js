const { Client, Collection } = require('discord.js');
require('dotenv').config()
const Mongoose = require('mongoose');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const client = new Client({ intents: 32767})
const Token = process.env.TOKEN
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

client.commands = new Collection();

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin({ emitEventsAfterFetching: true }),
              new SoundCloudPlugin(),
              new YtDlpPlugin()],
    youtubeDL: false
})
module.exports = client;

require("../Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token);