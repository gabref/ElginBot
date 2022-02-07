const { Client, MessageEmbed } = require('discord.js')
const { Discord_Channel_ID, Youtube_Channel_ID, watchIntervalHours } = require('./YtChannels.json')
var logger = require('../../Systems/Logs').Logger;
const ytch = require("yt-channel-info") //npm i yt-channel-info

module.exports = {
    name: "ready", 
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        //EMBED
        setInterval(() => {

            try {
                logger.info("Função Youtube")
                Youtube_Channel_ID.forEach((Yt_Channel_ID) => {
                    ytch.getChannelVideos(Yt_Channel_ID, "newest").then(async response => {
                        var idVideo = response.items[0]?.videoId;
                        if (!idVideo) return logger.error("ID do vídeo no youtube não encontrado");
        
                        await client.channels.cache.get(Discord_Channel_ID).messages.fetch()
                            .then(messages => {
                                var jaEnviado = false;
                                messages.forEach(msg => {
                                    if (msg.embeds[0]?.url?.endsWith(idVideo)) jaEnviado = true; logger.info("Vídeo do youtube já presente no canal");
                                });
        
                                if (!jaEnviado) {
                                    const Embed = new MessageEmbed()
                                        .setTitle("Vídeo novoo")
                                        .setAuthor({
                                            name: "",
                                            iconURL: "https://yt3.ggpht.com/EVtot7PVKMvV3EGABU0tOOY-jk6Ua7AvOASZJ1oTSpkFbFQ8Cc5n3uZ23XHh7slMiLNAawWl48M=s88-c-k-c0x00ffffff-no-rj"
                                        })
                                        .setURL(`https://youtu.be/${idVideo}`) 
                                        .setThumbnail(response.items[0].videoThumbnails[3].url)
                                        .setDescription(`Fala dev, acabou de sair vídeo novo no canal **${response.items[0].author}** \nVai lá assistir "${response.items[0].title}\"\n[Aqui o vídeo](https://youtu.be/${idVideo})`)
        
                                    client.channels.cache.get(Discord_Channel_ID).send({ embeds: [Embed] });
                                }
                            });
                    });
                })
            } catch (err) {
                logger.error(err);
            }
        }, 1000 * 60 * 60 * watchIntervalHours)
    }
}