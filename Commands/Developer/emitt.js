const { CommandInteraction, Client } = require('discord.js')
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "emitt",
    description: "Event emitter",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member Events.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString("member")

        switch(choices) {
            case "guildMemberAdd" : {
                client.emit("guildMemberAdd", interaction.member)
                interaction.reply({content: "Emitted the event", ephemeral: true})
                logger.info("Um membro fictício foi adicionado ao servidor.")
            }
            break;
            case "guildMemberRemove" : {
                client.emit("guildMemberRemove", interaction.member)
                interaction.reply({content: "Emitted the event", ephemeral: true})
                logger.info("Um membro fictício foi removido do servidor.")
            }
            break;
            default: 
                logger.info("Adicionar / Remover membro fictício não foi reconhecido no switch case.")

        }
    }
}