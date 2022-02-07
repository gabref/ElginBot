const { MessageReaction, User } = require("discord.js");
const logger = require('../../Systems/Logs').Logger;
const gson = require('./reactions.json')

module.exports = {
    name: "messageReactionRemove",
    /**
     * 
     * @param {MessageReaction} reaction 
     * @param {User} user 
     */
    async execute(reaction, user) {
        
        const channelId = '922462864017600563';

        if (user.bot) return;
        
        if (reaction.message.channel.id !== channelId) return;

        const reactions = ["🐍", "🧱", "👴", "↗", "🪓", "⚔", "🎮", "🏛", "🍎", "📊", "🎲", "🔧", "📱", "🔥", "🧊", "🤳", "🎓", "🚈", "🥽", "🔲"];
        
        try{
            const i = reactions.indexOf(reaction._emoji.name);
            const role = reaction.message.guild.roles.cache.find(r => r.name === gson.cargos[i]);
    
            await reaction.message.guild.members.cache.get(user.id).roles.remove(role)
    
            await reaction.message.channel.send({ content: `Foi removido o cargo ${role}` })
                .then(msg => setTimeout(() => msg.delete(), 4000)).catch((err) => console.log(err))
                      
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
    }
}