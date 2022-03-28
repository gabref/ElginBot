const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "musica",
    description: "Sistema de Música",
    // permission: "ADMINISTRATOR",
    options: [
        { name: "play", description: "Toque uma música", type: "SUB_COMMAND",
            options: [ { name: "query", description: "Escreva o nome ou a url da música", type: "STRING", required: true } ]
        },
        { name: "volume", description: "Altere o volume", type: "SUB_COMMAND",
            options: [ { name: "porcentagem", description: "10 = 10%", type: "NUMBER", required: true } ]
        },
        { name: "opcoes", description: "selecione uma opção", type: "SUB_COMMAND",
            options: [ { name: "acoes", description: "Selecione uma opção", type: "STRING", required: true,
                    choices: [
                        { name: "⏬ Ver Lista", value: "queue" },
                        { name: "⏩ Pular Música", value: "skip" },
                        { name: "⏸ Pausa Música", value: "pause" },
                        { name: "⏯ Retomar Música", value: "resume" },
                        { name: "⏹ Stop", value: "stop" },
                        { name: "‼ Embaralhar Lista", value: "shuffle"},
                        { name: "⬛ Modo auto play", value: "AutoPlay" },
                        { name: "〽 Adicionar Música Relacionada", value: "RelatedSong" },
                        { name: "♻ Repetir Playlist", value: "RepeatMode" },
                        
                    ]
                }
            ]
        }
    ], 
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel) 
        return interaction.reply({content: "Você tem que estar em um canal de voz para usar esse comando.", ephemeral: true})

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `ElginBot já está tocando música no canal de voz <#${guild.me.voice.channelId}>`, ephemeral: true})

        try {
            switch(options.getSubcommand()){
                case "play": {
                    client.distube.play(VoiceChannel, options.getString('query'), { textChannel: channel, member: member });
                    return interaction.reply({content: "Pedido recebido"});
                }
                case "volume": {
                    const Volume = options.getNumber('porcentagem');
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "Use um número entre 1 e 100."})

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({ content: `➰ Volume em: \`${Volume}%\``});
                }
                case "opcoes": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "❌ Não tem nada na lista de músicas, use o comando 'musica play' para adicionar."})

                    switch(options.getString('acoes')) {
                        case "skip": 
                            await queue.skip(VoiceChannel);
                            return interaction.reply({content: "⏩ Música foi pulada."})

                        case "stop":
                            await queue.stop(VoiceChannel);
                            return interaction.reply({content: "⏸ Parei as músicas"})

                        case "pause":
                            await queue.pause(VoiceChannel);
                            return interaction.reply({content: "⏸ Dei pausa na música"})

                        case "resume":
                            await queue.resume(VoiceChannel);
                            return interaction.reply({content: "▶ Retomei a música"})   

                        case "shuffle":
                            await queue.shuffle(VoiceChannel);
                            return interaction.reply({content: "‼ Embaralhei a playlist"})   

                        case "AutoPlay":
                            let Mode = await queue.toggleAutoplay(VoiceChannel);
                            return interaction.reply({content: ` Status Modo Autoplay: ${Mode ? "Acionado" : "Desligado"}`})   

                        case "RelatedSong":
                            await queue.addRelatedSong(VoiceChannel);
                            return interaction.reply({content: "Uma música foi adicionada à playlist"})   

                        case "RepeatMode":
                            let RMode = await client.distube.setRepeatMode(queue)
                            return interaction.reply({content: ` Status Modo Repetir: ${RMode = RMode ? RMode == 2 ? "Playlist" : "1 música" : "Desligado"}`})   

                        case "queue":
                            return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("PURPLE")
                            .setDescription(`${queue.songs.map( (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]})
                    }
                    return;
                }
            }
            
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`�� Alerta: ${e}`) 
            return interaction.reply({embeds: [errorEmbed]})
        }
        
    }
}