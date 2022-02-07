const { Client } = require('discord.js')
require('dotenv').config()
const mongoose = require('mongoose')
// const { DatabaseUrl } = require('../../Structures/config.json')
const DatabaseUrl = process.env.DATABASEURL
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "ready", 
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`The client is now ready! \nLogged in as ${client.user.tag}`)
        logger.info(`The client is now ready! \nLogged in as ${client.user.tag}`)
        client.user.setActivity('wubba lubba dub dub!', {type: "WATCHING"})

        require('../../Systems/LockdownSys')(client);
        
        if(!DatabaseUrl) return
        mongoose.connect(DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
            logger.info("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
            logger.error(err)
        })
    }
}