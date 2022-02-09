const { CommandInteraction } = require('discord.js');
const DB = require('../../Structures/Schemas/BottomMessages')
const logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "messagebottomsetup",
    description: "Message Bottom set up",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "Escolha um canal",
            required: true
        },
        {
            name: "message",
            type: "STRING",
            description: "Message to be at the bottom",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */ 
    async execute(interaction) {


        interaction.deferReply({ ephemeral: true })

        const chosenChannel = interaction.options.getChannel("channel");
        const chosenMessage = interaction.options.getString("message");
        
        try {
            
            const sendedMessage = await chosenChannel.send(chosenMessage);

            const dados = await DB.findOne({ ChannelID: chosenChannel.id })
            
            if(!dados) {
                await DB.create({ ChannelID: chosenChannel.id, MessageID: sendedMessage.id, MessageDescription: chosenMessage })
                return interaction.editReply("criei")
            } else {
                await chosenChannel.messages.fetch(dados.MessageID).then((m) => m.delete());
                
                await DB.updateOne({ ChannelID: chosenChannel.id }, { $set: { MessageID: sendedMessage.id, MessageDescription: chosenMessage }})
                return interaction.editReply("atualizei")
            }

        } catch (e) {
            console.log(e);
            logger.error(e.message);
        }

    }
    
}