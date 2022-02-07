const { MessageEmbed, Message, WebhookClient} = require('discord.js')

module.exports = {
    name: "messageDelete", 
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 Uma [message](${message.url}) de ${message.author.tag} foi **deletada**.\n
        **Mensagem Deletada:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`Anexos:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({
            id: "936693077576405042",
            token: "Arbj49eU3ItSwn0fyR3GYwEvLvIMjPbjS0LDCBUAaBAyDmYM_1Q3CzenwydGrusrgXD1"
        }).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}