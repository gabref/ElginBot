const { MessageReaction, User } = require("discord.js");
const fs = require('fs')
const userDB = require('../../Structures/Schemas/User')
const logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "messageReactionAdd",
    /**
     * 
     * @param {MessageReaction} reaction 
     * @param {User} user 
     */
    async execute(reaction, user) {
        
        const channelId = '922462864017600563';

        if (user.bot) return;
        
        if (reaction.message.channel.id !== channelId) return;

        let UsuarioDB = await userDB.findOne({ UserID: user.id });
        if (!UsuarioDB) UsuarioDB = await userDB.create({ UserID: user.id });

        try{
            const rawdataJson = fs.readFileSync('./Events/ReactionRoles/reactions.json')
            const jsonR = JSON.parse(rawdataJson)
            const reactionsC = jsonR.reactionsC
            const reactionsL = jsonR.reactionsL
            const cargosC = jsonR.cargosC
            const cargosL = jsonR.cargosL

            const indexL = reactionsL.indexOf(`<:${reaction._emoji.name}:${reaction._emoji.id}>`);
            const indexC = reactionsC.indexOf(`<:${reaction._emoji.name}:${reaction._emoji.id}>`);
            let cargos = indexL != -1 ? cargosL : cargosC;
            let i = indexL != -1 ? indexL : indexC;
            const role = reaction.message.guild.roles.cache.find(r => r.name === cargos[i]);
    
            await reaction.message.guild.members.cache.get(user.id).roles.add(role);

            let dbAtualizado = "";
            if (!UsuarioDB.CargosID.includes(role.id)){
                const res = await userDB.updateOne({ UserID: user.id }, { $push: { CargosID: role.id }})
                dbAtualizado = res ? "banco de dados foi atualizado ✅." : "deu erro ao atualizar o banco de dados 😥."
            } else { dbAtualizado = "banco de dados já estava atualizado 👍"}
    
            return reaction.message.channel.send({ content: `Foi adicionado o cargo ${role} e ${dbAtualizado}`, ephemeral: true })
            .then(msg => setTimeout(() => msg.delete(), 5000)).catch((err) => console.log(err))
                      
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
    }
}