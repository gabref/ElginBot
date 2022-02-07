const { MessageEmbed, CommandInteraction } = require('discord.js')
const DB = require('../../Structures/Schemas/Ticket')

module.exports = {
    name: "ticket",
    description: "Ticket Actions.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Adicionar ou Remover um membro deste ticket.",
            required: true,
            choices: [
                { name: "Add", value: "add" },
                { name: "Remove", value: "remove" },
            ]
        },
        {
            name: "member",
            description: "Selecionar um membro",
            type: "USER",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guildId, options, channel } = interaction;

        const Action = options.getString("action");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed();

        switch(Action) {
            case "add" : {
                DB.findOne(
                    { GuildID: guildId, ChannelID: channel.id },
                    async (err, docs) => {
                        if (err) throw err;
                        if(!docs) 
                            return interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("RED")
                                    .setDescription(
                                        "🛑 | Esse canal não está atrelado a um ticket."
                                    )
                                ],
                                ephemeral: true
                            });
                        if(docs.MembersID.includes(Member.id))
                            return interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("RED")
                                    .setDescription(
                                        "🛑 | Esse membro já foi adicionado a este ticket."
                                    )
                                ],
                                ephemeral: true
                            });
                            docs.MembersID.push(Member.id);

                            channel.permissionOverwrites.edit(Member.id, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                                READ_MESSAGE_HISTORY: true
                            });

                            interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("GREEN")
                                    .setDescription(
                                        `✅ | ${Member} foi adicionado a este ticket.`
                                    )
                                ]
                            });
                        docs.save();
                    }
                );
            }
            break;
            case "remove" : {
                DB.findOne(
                    { GuildID: guildId, ChannelID: channel.id },
                    async (err, docs) => {
                        if (err) throw err;
                        if(!docs) 
                            return interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("RED")
                                    .setDescription(
                                        "🛑 | Esse canal não está atrelado a um ticket."
                                    )
                                ],
                                ephemeral: true
                            });
                        if(!docs.MembersID.includes(Member.id))
                            return interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("RED")
                                    .setDescription(
                                        "🛑 | Esse membro não está neste ticket."
                                    )
                                ],
                                ephemeral: true
                            });
                            docs.MembersID.remove(Member.id);

                            channel.permissionOverwrites.edit(Member.id, {
                                VIEW_CHANNEL: false,
                            });

                            interaction.reply({
                                embeds: [
                                    Embed
                                    .setColor("GREEN")
                                    .setDescription(
                                        `✅ | ${Member} foi removido deste ticket.`
                                    )
                                ]
                            });
                        docs.save();
                    }
                );
            }
            break;
        }
    }
}