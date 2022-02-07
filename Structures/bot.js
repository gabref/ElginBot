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

require("../Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token);