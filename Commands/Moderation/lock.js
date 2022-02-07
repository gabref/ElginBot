const { CommandInteraction, MessageEmbed } = require('discord.js')
const DB = require('../../Structures/Schemas/LockDown')
const ms = require('ms')
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "lock",
    description: "Lockdown esse canal",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: "time",
            description: "Tempo para finalizar esse lockdown (1m, 1h, 1d).",
            type: "STRING"
        },
        {
            name: "reason",
            description: "Motivo do lockdown.",
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, channel, options } = interaction;

        const Reason = options.getString("reason") || "Nenhum motivo especificado."

        const Embed = new MessageEmbed();

        if(!channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
            return interaction.reply({ 
                embeds: [
                    Embed
                    .setColor("RED")
                    .setDescription(
                        "🛑 | Esse canal já está em lockdown."
                    )
                ],
                ephemeral: true
            });

            channel.permissionOverwrites.edit(guild.id, {
                SEND_MESSAGES: false,
            });

            interaction.reply({ 
                embeds: [
                    Embed
                    .setColor("RED")
                    .setDescription(
                        `🔒 | Esse canal está agora em lockdown. Motivo: ${Reason}`
                    )
                ]
            })
            const Time = options.getString("time");
            if(Time) {
                const ExpireDate = Date.now() + ms(Time);
                DB.create({
                    GuildID: guild.id,
                    ChannelID: channel.id,
                    Time: ExpireDate
                });

                setTimeout(async () => {
                    channel.permissionOverwrites.edit(guild.id, {
                        SEND_MESSAGES: null,
                    });
                    interaction.editReply({
                        embeds: [
                            Embed
                            .setDescription(
                                "🔓 | O lockdown desde canal terminou."
                            )
                            .setColor(
                                "GREEN"
                            ) 
                        ]
                    }).catch(() => {});
                    await DB.deleteOne({
                        ChannelID: channel.id
                    });
                }, ms(Time));
            }
    }
}