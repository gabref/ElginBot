const { ButtonInteraction } = require('discord.js');
const DB = require('../../Structures/Schemas/SuggestDB')
// const TicketSetupData = require('../../Structures/Schemas/TicketSetup')

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const { guildId, customId, message } = interaction;

        if(!["suggest-accept", "suggest-decline"].includes(customId)) return;

        await interaction.deferReply({ ephemeral: true });

        if(!interaction.member.permissions.has("MANAGE_NICKNAMES"))
        return await interaction.editReply({content: "Você não pode usar esse botão!", ephemeral: true});


        // const Data = await TicketSetupData.findOne({ GuildID: guild.id });
        // if(Data.Buttons.includes(customId)) return;

        // if(["close", "lock", "unlock", "claim"].includes(customId)) return;

        
        DB.findOne({guildID: guildId, MessageID: message.id}, async(err, data) => {
            if(err) throw err;
            if(!data) return await interaction.editReply({content: "Não foram encontrados dados no banco de dados...", ephemeral: true});

            const Embed = message.embeds[0];
            if(!Embed) return;

            switch(customId) {
                case "suggest-accept" : {
                    Embed.fields[2] = { name: "Status", value: "Aceito", inline: true };
                    message.edit({embeds: [Embed.setColor("GREEN")], components: []});
                    return await interaction.editReply({content: "Sugestão Aceita", ephemeral: true }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                }
                break;
                case "suggest-decline" : {
                    Embed.fields[2] = { name: "Status", value: "Não Aceito", inline: true };
                    message.edit({embeds: [Embed.setColor("RED")], components: []});
                    return await interaction.editReply({content: "Sugestão Não Aceita", ephemeral: true }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                }
                break;
            }
        })
    }
}