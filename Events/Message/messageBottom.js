const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Structures/Schemas/BottomMessages')
const logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        
        if(!interaction.isCommand()) return;

        if(interaction.commandName === "messagebottomsetup") return;
        
        const channelID = interaction.channelId;

        const Embed = new MessageEmbed()
            .setTitle("Instruções")
            .setColor("AQUA")
            .setFooter({ text: "Fica a dica: use a tecla TAB para passar para a opção seguinte"});

        try {
            const dados = await DB.findOne({ ChannelID: channelID });

            if(!dados) {
                // console.log("messageBottom interaction found no data in the DB");
                logger.info("messageBottom interaction found no data in the DB");
            } else if (dados.ChannelID === interaction.channelId){

                await interaction.channel.messages.fetch(dados.MessageID).then((m) => m.delete());                
                await interaction.channel.send({ embeds: [Embed.setDescription(dados.MessageDescription)]})
                .then(async (m) => {
                    await DB.updateOne({ ChannelID: interaction.channelId }, { MessageID: m.id })
                })

            } else {
                console.log("messageBottom não bateu os canais");
                logger.error("messageBottom não bateu os canais");
            }

        } catch (e) {
            console.log(e);
            logger.error(e.message);
        }
        
    }
}