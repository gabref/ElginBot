const { MessageReaction, User } = require("discord.js");
const userDB = require('../../Structures/Schemas/User')
const logger = require('../../Systems/Logs').Logger;

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

        let UsuarioDB = await userDB.findOne({ UserID: user.id });
        if (!UsuarioDB) UsuarioDB = await userDB.create({ UserID: user.id });

        const reactionsL = ["🐍", "🧱", "👴", "↗", "🪓", "⚔", "🎮", "🏛", "🍎", "📊", "🎲", "🔧", "📱", "🔥", "🧊", "🤳", "🎓", "🚈", "🥽", "🔲"];
        const cargosL = ["Python", "Java", "VB6", "Javascript", "C", "C++", "C#", "Delphi", "Swift", "SQL", "Dart", "Rust", "Flutter", "Fire Monkey", "Ionic", "Xamarin Android", "Xamarin Forms", "Kotlin", "ReactNative", "WinDev"];
        const reactionsI = ["👶", "🧒", "🧑", "🧓"]
        const cargosI = ["Trainee", "Junior", "Plêno", "Sênior"];
        const reactionsC = ["👽", "✨", "👷‍♂️", "🚀", "📞", "📈", "👨‍🔬", "🕹", "🎨", "🕵️‍♂️", "🐧" ];
        const cargosC = ["Android", "Front End", "Back End", "Fullstack", "Mobile", "Dev Ops", "Data Science", "Game Dev", "UX / UI design", "Cyber Security", "Linux"];
        
        try{
            const indexL = reactionsL.indexOf(reaction._emoji.name);
            const indexI = reactionsI.indexOf(reaction._emoji.name);
            const indexC = reactionsC.indexOf(reaction._emoji.name);
            let cargos = 
                indexL != -1 ? cargosL : 
                indexI != -1 ? cargosI : 
                               cargosC;
            let i = 
                indexL != -1 ? indexL : 
                indexI != -1 ? indexI : 
                               indexC;
            const role = reaction.message.guild.roles.cache.find(r => r.name === cargos[i]);
    
            await reaction.message.guild.members.cache.get(user.id).roles.remove(role);

            let dbAtualizado = "";
            if (UsuarioDB.CargosID.includes(role.id)){
                const res = await userDB.updateOne({ UserID: user.id }, { $pull: { CargosID: role.id }})
                dbAtualizado = res ? "banco de dados foi atualizado ✅." : "deu erro ao atualizar o banco de dados 😥."
            } else { dbAtualizado = "banco de dados já estava atualizado 👍"}
    
            return reaction.message.channel.send({ content: `Foi removido o cargo ${role} e ${dbAtualizado}`, ephemeral: true })
            .then(msg => setTimeout(() => msg.delete(), 5000)).catch((err) => console.log(err))
                      
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
    }
}