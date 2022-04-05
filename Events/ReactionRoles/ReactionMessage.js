const { Client, MessageEmbed } = require('discord.js')
const fs = require('fs')
const logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: 'ready',
    on: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {

        const channelId = '922462864017600563';

        const rawdataJson = fs.readFileSync('./Events/ReactionRoles/reactions.json')
        const jsonR = JSON.parse(rawdataJson)
        const reactionsC = jsonR.reactionsC
        const reactionsL = jsonR.reactionsL
        const cargosC = jsonR.cargosC
        const cargosL = jsonR.cargosL

        emojiTextL = "";
        emojiTextC = "";
        cargosL.forEach((v, i) => { if(i < 20) emojiTextL += `${reactionsL[i]} = ${v}\n` });
        cargosC.forEach((v, i) => { if(i < 20) emojiTextC += `${reactionsC[i]} = ${v}\n` });

        const reactionEmbedLanguages = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Escolha as suas linguagens!')
            .setURL('https://github.com/ElginDeveloperCommunity')
            .setAuthor({ name: 'Elgin Developers Community', iconURL: 'https://avatars.githubusercontent.com/u/78883867?v=4', url: 'https://github.com/ElginDeveloperCommunity' })
            .setDescription(emojiTextL)
            .setThumbnail('https://avatars.githubusercontent.com/u/78883867?v=4')
            // .setImage('')
            .setFooter({ text: 'Wubba Lubba lub lub' });
        const reactionEmbedConhecimento = new MessageEmbed()
            .setColor('DARK_GREEN')
            .setTitle('Escolha o seu nível de conhecimento!')
            .setURL('https://github.com/ElginDeveloperCommunity')
            .setAuthor({ name: 'Elgin Developers Community', iconURL: 'https://avatars.githubusercontent.com/u/78883867?v=4', url: 'https://github.com/ElginDeveloperCommunity' })
            .setDescription(emojiTextC)
            .setThumbnail('https://avatars.githubusercontent.com/u/78883867?v=4')
            .setFooter({ text: 'Sometimes science is more art than science.' });            

        const channel = await client.channels.fetch(channelId);

        channel.messages.fetch().then(async (messages) => {
            if (messages.size === 0) {
                channel.send({ embeds: [reactionEmbedConhecimento] }).then((m) => {
                    addReactions(m, reactionsC);
                }).then(() => {
                    channel.send({ embeds: [reactionEmbedLanguages] }).then((m) => {
                        addReactions(m, reactionsL);
                    });
                })
                
                
            } else {
                for (const message of messages) {
                    const titleEmbed = message[1].embeds[0].title;
                    if (titleEmbed.includes("linguagens")){
                        message[1].edit({ embeds: [reactionEmbedLanguages]});
                        await addReactions(message[1], reactionsL);
                    } else {
                        message[1].edit({ embeds: [reactionEmbedConhecimento]});
                        await addReactions(message[1], reactionsC);
                    }                    
                    
                }
            }
            console.log('Pronto para começar!');
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