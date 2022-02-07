const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js')
const DB = require("../../Structures/Schemas/Ticket")
const TicketSetupData = require('../../Structures/Schemas/TicketSetup')
const WhatsApp = require('../../Systems/WhatsAppNotifications')
const logger = require('../../Systems/Logs').Logger

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction){
        if(!interaction.isButton()) return;
        const { guild, member, customId } = interaction;

        const Data = await TicketSetupData.findOne({ GuildID: guild.id });
        if (!Data) return;

        if(!Data.Buttons.includes(customId)) return;
        
        await interaction.deferReply({ ephemeral: true });

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels
        .create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: Data.Everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                }
            ]
        }).then(async (channel) => {
            await DB.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
                Claimed: false
            });

            const Embed = new MessageEmbed()
            .setAuthor({
                name: `${guild.name} | Ticket: ${ID}`,
                iconURL: guild.iconURL({ dynamic: true })
            })
            .setDescription("Por favor, espera rapidão que alguém da equipe vem aqui. Enquanto isso descreve o seu problema em detalhes.")
            .setFooter({ text: "Os botões abaixo são para a equipe." });
    
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Salvar e Fechar Ticket")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
                new MessageButton()
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
                new MessageButton()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle("SUCCESS")
                .setEmoji("🔓"),
                new MessageButton()
                .setCustomId("claim")
                .setLabel("Claim")
                .setStyle("PRIMARY")
                .setEmoji("👍") 
            );
    
            await channel.send({
                embeds: [Embed], 
                components: [Buttons]
            });
            await channel
                .send({content: `${member} aqui está seu ticket`, })
                .then((m) => {
                    setTimeout(() => {
                        m.delete().catch(() => {})
                    }, 1 * 5000);
                })
            
            await interaction.editReply({
                content: `${member} seu ticket foi criado: ${channel}`,
                ephemeral: true
            }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});

            WhatsApp.WhatsAppOpenTicket(customId, 
                                        customId.toLowerCase().replace(" ", "-") + "-" + ID,
                                        `https://discord.com/channels/${interaction.guild.id}/${channel.id}`);

        });
    }
}