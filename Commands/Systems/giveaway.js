const { CommandInteraction, MessageEmbed } = require('discord.js')
const ms = require('ms')
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "giveaway",
    description: "Um sistema de sorteios.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Comece um sorteio.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Prover a duração deste sorteio (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "Selecionar o número de vencedores desse sorteio.",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Qual o nome do prêmio?",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Seleciona um canal para enviar o sorteio.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "actions",
            description: "Opções para o sorteio.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Selecione uma opção.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                },
                {
                    name: "message-id",
                    description: "Retorna o id da mensagem do sorteio.",
                    type: "STRING",
                    required: true
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
        const { options } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {

                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(interaction.channel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages : {
                        giveaway: "🎉 SORTEIO COMEÇOU 🎉",
                        giveawayEnded: "🔔 SORTEIO ACABOU 🔔",
                        winMessage: "Parabéns, {winners}! Você ganhou **{this.prize}**!"
                    }
                }).then(async () => {
                    // console.log(gData); // {...} (messages, end date and more)
                    successEmbed.setDescription("Sorteio começou.")
                    return interaction.reply({embeds: [successEmbed]})
                }).catch((err) => {
                    successEmbed.setDescription(`Ocorreu um erro\n\`${err}\``)
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true})
                });
            }
            break;

            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");
                const giveaway = 
                // search with giveaway prize
                // client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === interaction.options.getString('query')) ||
                // search with messageId
                client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messagesId === messageId);

                // if no giveaway was found
                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                }
                switch(choice) {
                    case "end" : {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription("Sorteio foi finalizado.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Um erro ocorreu\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        })
                    }
                    break;
                    case "pause" : {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription("Sorteio foi pausado.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Um erro ocorreu\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        })
                    }
                    break;
                    case "unpause" : {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription("Sorteio foi despausado.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Um erro ocorreu\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        })
                    }
                    break;
                    case "reroll" : {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription("Sorteio foi rerolled.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Um erro ocorreu\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        })
                    }
                    break;
                    case "delete" : {
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription("Sorteio foi deletado.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            errorEmbed.setDescription(`Um erro ocorreu\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        })
                    }
                    break;
                }
            }
            break;

            default : {
                logger.info("Error in giveaway command.")
            }
        }
    }
}