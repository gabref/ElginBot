const { MessageReaction, User, Client, MessageEmbed } = require('discord.js')
const { reactions, cargos } = require('./reactions.json')
module.exports = {
    name: 'ready',
    on: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {

        const channelId = '922462864017600563';

        emojiText = "";
        cargos.forEach((v, i) => emojiText += `${reactions[i]} = ${v}\n`);

        const reactionEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Escolha as suas linguagens!')
            .setURL('https://github.com/ElginDeveloperCommunity')
            .setAuthor({ name: 'Some name', iconURL: 'https://avatars.githubusercontent.com/u/78883867?v=4', url: 'https://github.com/ElginDeveloperCommunity' })
            .setDescription(emojiText)
            .setThumbnail('https://avatars.githubusercontent.com/u/78883867?v=4')
            // .setImage('')
            .setFooter({ text: 'Wubba Lubba lub lub' });

        const channel = await client.channels.fetch(channelId);

        channel.messages.fetch().then((m) => {
            if (m.size === 0) {
                // envia mensagem nova
                channel.send({ embeds: [reactionEmbed] })
                .then((m) => {
                    addReactions(m, reactions);
                })
            } else {
                for (const message of m) {
                    message[1].edit({ embeds: [reactionEmbed]});
                    addReactions(message[1], reactions)
                }
            }
        })

        async function addReactions(message, reactions) {
            try {
                await message.react(reactions[0]);
                reactions.shift();
                if (reactions.length > 0) {
                    setTimeout(() => addReactions(message, reactions), 750);
                }
            } catch (err) {
                console.log('One of the emojis gave an error on reacting', err);
                logger.error(`One of the emojis gave an error on reacting: ${err}`)
            }  
        }
    }

}