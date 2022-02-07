const { CommandInteraction, MessageEmbed } = require('discord.js')
const DB = require("../../Structures/Schemas/AFKSystem")

module.exports = {
    name: "afk",
    description: "AFK System.",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description: "Coloque seu AFK Status", 
            options: [
                {
                    name: "status",
                    description: "especifique seu status",
                    type: "STRING", 
                    required: true
                }
            ]
        },
        {
            name: "return",
            type: "SUB_COMMAND",
            description: "Volte do AFK", 
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp} = interaction;

        const Embed = new MessageEmbed()
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})});

        const afkStatus = options.getString("status");

        try {

            switch(options.getSubcommand()) {
                case "set" : {
                    await DB.findOneAndUpdate(
                        { GuildID: guild.id, UserID: user.id },
                        { Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        { new: true, upsert: true }
                        )

                        Embed.setColor("GREEN").setDescription(`Seu AFK Status foi atualizado para: ${afkStatus}`);
                        return interaction.reply({embeds: [Embed], ephemeral: true})
                    }
                    break;
                    case "return" : {
                        await DB.deleteOne({ GuildID: guild.id, UserID: user.id });
                        Embed.setColor("RED").setDescription(`Seu AFK Status foi removido.`);
                        return interaction.reply({embeds: [Embed], ephemeral: true})
                }
                break;
            }

        } catch (err) {
            console.log(err)
        }
    }
}