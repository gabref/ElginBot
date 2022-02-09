const { Message } = require('discord.js')

module.exports = {
    name: "messageCreate", 
    /**
     * 
     * @param {Message} message
     */
    async execute(message) {

        if(message.author.bot) return;

        const IDcadastro = "940910149793619968";
        const IDsugestao = "922513261503606834";

        if(message.channelId !== IDcadastro) return;

        const channelProperty = message.channel;
        const authorID = message.author.id;

        if(message.content[0] !== "/") {
            message.delete();
            channelProperty.send({ content: `<@${authorID}>, use apenas comandos neste canal` })
                .then(msg => setTimeout(() => msg.delete(), 5000)).catch((err) => console.log(err));
        }
    }
}