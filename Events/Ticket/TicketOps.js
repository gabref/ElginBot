const { ButtonInteraction, MessageEmbed } = require('discord.js')
const { createTranscript } = require('discord-html-transcripts')
const DB = require('../../Structures/Schemas/Ticket')
const TicketSetupData = require('../../Structures/Schemas/TicketSetup')
const WhatsApp = require('../../Systems/WhatsAppClaim')

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;
        if(!["close", "lock", "unlock", "claim"].includes(customId)) return;

        await interaction.deferReply()

        const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
        if(!TicketSetup) return await interaction.editReply({ 
            content: "Os dados para este sistema estão ultrapassados."
        })
        
        if(!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
            return await interaction.editReply({ 
                content: "Você não pode usar esses botões.",
                ephemeral: true
            }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});

        const Embed = new MessageEmbed()
        .setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) return await interaction.editReply({ 
                content: "Nenhum dado foi encontrado sobre este ticket, por favor deletar o manual.",
            ephemeral: true
            }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
            switch(customId) {
                case "lock" : {
                    if(docs.Locked == true)
                    return await interaction.editReply({
                        content: "O ticket já está bloqueado.",
                        ephemeral: true
                    }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
                    Embed.setDescription("🔒 | Este ticket está bloqueado para revisão.");

                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, { 
                            SEND_MESSAGES: false 
                        });

                    })
                    return await interaction.editReply({ embeds: [Embed] })
                        .catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                }
                break;
                case "unlock" : {
                    if(docs.Locked == false)
                    return await interaction.editReply({
                        content: "O ticket já está desbloqueado.",
                        ephemeral: true
                    }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
                    Embed.setDescription("🔓 | Este ticket está agora desbloqueado.");
                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, { 
                            SEND_MESSAGES: true 
                        });
                    })
                    return await interaction.editReply({ embeds: [Embed] }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                }
                break;
                case "close" : {
                    if(docs.Closed == true)
                    return await interaction.editReply({
                        content: "Ticket já está fechado, espera que já vai ser deletado.",
                        ephemeral: true
                    }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});
                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${docs.Type} - ${docs.TicketID}.html`
                    });
                    await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                    // const MEMBER = guild.members.cache.get(docs.MemberID);
                    const Message = await guild.channels.cache
                    .get(TicketSetup.Transcripts)
                    .send({
                        embeds: [
                            Embed
                            // .setAuthor(
                            //     { 
                            //         name: MEMBER.user.tag, 
                            //         iconURL: MEMBER.user.displayAvatarURL({ dynamic: true })
                            //     }
                            // )
                            .setTitle(`Trascript Type: ${docs.Type}\nID: ${docs.TicketID}`)
                        ],
                        files: [attachment]
                    });

                    await interaction.editReply({ 
                        embeds: [
                            Embed.setDescription(
                                `A transcrição está salva em [TRASCRIPT](${Message.url}).`)
                            ]
                        }
                    ).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});

                    setTimeout(() => {
                        channel.delete();
                    }, 10 * 1000);
                }
                break;
                case "claim" : {
                    if(docs.Claimed == true) 
                        return await interaction.editReply({
                            content: `Este ticket já foi aceito por <@${docs.ClaimedBy}>`,
                            ephemeral: true
                        }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});

                    await DB.updateOne(
                        { ChannelID: channel.id}, 
                        { Claimed: true, ClaimedBy: member.id }
                    );

                    Embed.setDescription(
                        `👍 | Este ticket foi agora aceito por ${member}`
                    );
                    await interaction.editReply({
                        embeds: [Embed]
                    }).catch((err) => { interaction.reply('Erro: Houve uma falha na matrix 👨‍💻.'); return logger.error(err)});

                    function formatTime(unix_timestamp) {
                        var date = new Date(unix_timestamp);
                        var day = `0${date.getDay()}`;
                        var month = `0${date.getMonth()}`;
                        var year = date.getFullYear();
                        var hours = `0${date.getHours()}`;
                        var minutes = `0${date.getMinutes()}`;
                        var seconds = `0${date.getSeconds()}`;
                        
                        return `${day
                                .substring(day.length-2, day.length)}/${month
                                .substring(month.length-2, month.length)}/${year} às ${hours
                                .substring(hours.length-2, hours.length)}:${minutes
                                .substring(minutes.length-2, minutes.length)}:${seconds
                                .substring(seconds.length-2, seconds.length)}`;

                    }

                    // console.log(formatTime(interaction.channel.createdAt));
                    // console.log(formatTime(interaction.channel.createdTimestamp));
                    // console.log(formatTime(interaction.message.createdAt));
                    // console.log(formatTime(interaction.message.createdTimestamp));

                    // console.log(member.nickname);         // null
                    // console.log(member.id);               // id 8324729
                    // console.log(member.displayName);      // gabriel.franzeri
                    // console.log(member.displayColor);     // 302834
                    // console.log(member.displayHexColor);  // #dljfsf
                    // console.log(member.nick);             // undefined
                    // console.log(member.user.id);          // id 874384
                    // console.log(member.user.tag);         // gabriel.franzeri#7078
                    // console.log(member.user.username);    // gabriel.franzeri
                    

                    WhatsApp.WhatsAppClaim(
                        channel.name.slice(0, -6).replace("-", " "), 
                        channel.name, formatTime(channel.createdAt),
                        member.nick || member.user.username
                    )

                    
                }
                break;
            }
        })
    }
}