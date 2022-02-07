const { MessageEmbed, Message, WebhookClient} = require('discord.js')

module.exports = {
    name: "messageUpdate", 
    /**
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;
        // We're going to ignore messages that are sent by bots
        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 Uma [message](${newMessage.url}) de ${newMessage.author} foi **editada** em ${newMessage.channel}.\n
        **Original**:\n ${Original} \n**Editada**:\n${Edited}`.slice("0", "4096"))
        .setFooter({ text: `Membro: ${newMessage.author.tag} | ID: ${newMessage.author.id}`});
        
        new WebhookClient({
            id: "936693077576405042",
            token: "Arbj49eU3ItSwn0fyR3GYwEvLvIMjPbjS0LDCBUAaBAyDmYM_1Q3CzenwydGrusrgXD1"
        }).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}