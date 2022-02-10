const { CommandInteraction, MessageEmbed } = require('discord.js')
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "clear", 
    description: "Deleta um número específico de mensagens de um canal de texto ou de um usuário.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Selecionar quantidade de mensagens a serem deletadas do canal o do usuário.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Selecionar um usuário para apagar as mensagens.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction

        const Amount = options.getNumber("amount")
        const Target = options.getMember("target")

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        try {
            if(Target) {
                let i = 0;
                const filtered = [];
                (await Messages).filter((m) => {
                    if(m.author.id === Target.id && Amount > i) {
                        filtered.push(m);
                        i++;
                    }
                })
    
                await channel.bulkDelete(filtered, true).then(messages => {
                    Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}.`);
                    interaction.reply({embeds: [Response]});
                    logger.info(`${messages.size} mensagens do usuário ${Target} foram apagadas usando o comando clear`)
                })
            } else {
                await channel.bulkDelete(Amount, true).then(messages => {
                    Response.setDescription(`🧹 Cleared ${messages.size} from this channel.`);
                    interaction.reply({embeds: [Response]});
                    logger.info(`${messages.size} mensagens foram apagadas usando o comando clear`)
                })
            }
        } catch (e) {
            console.log(e);
        }
        
    }
}