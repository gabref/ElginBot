const { MessageReaction, User, Client, MessageEmbed } = require('discord.js')
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

        const reactionsL = ["🐍", "🧱", "👴", "↗", "🪓", "⚔", "🎮", "🏛", "🍎", "📊", "🎲", "🔧", "📱", "🔥", "🧊", "🤳", "🎓", "🚈", "🥽", "🔲"];
        const cargosL = ["Python", "Java", "VB6", "Javascript", "C", "C++", "C#", "Delphi", "Swift", "SQL", "Dart", "Rust", "Flutter", "Fire Monkey", "Ionic", "Xamarin Android", "Xamarin Forms", "Kotlin", "ReactNative", "WinDev"];
        const reactionsI = ["👶", "🧒", "🧑", "🧓"]
        const cargosI = ["Trainee", "Junior", "Plêno", "Sênior"];
        const reactionsC = ["👽", "✨", "👷‍♂️", "🚀", "📞", "📈", "👨‍🔬", "🕹", "🎨", "🕵️‍♂️", "🐧" ];
        const cargosC = ["Android", "Front End", "Back End", "Fullstack", "Mobile", "Dev Ops", "Data Science", "Game Dev", "UX / UI design", "Cyber Security", "Linux"];

        emojiTextL = "";
        emojiTextI = "";
        emojiTextC = "";
        cargosL.forEach((v, i) => { if(i < 20) emojiTextL += `${reactionsL[i]} = ${v}\n` });
        cargosI.forEach((v, i) => { if(i < 20) emojiTextI += `${reactionsI[i]} = ${v}\n` });
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
        const reactionEmbedDev = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Escolha os seus interesses!')
            .setURL('https://github.com/ElginDeveloperCommunity')
            .setAuthor({ name: 'Elgin Developers Community', iconURL: 'https://avatars.githubusercontent.com/u/78883867?v=4', url: 'https://github.com/ElginDeveloperCommunity' })
            .setDescription(emojiTextI)
            .setThumbnail('https://avatars.githubusercontent.com/u/78883867?v=4')
            .setFooter({ text: 'Boom! Big reveal! I turned myself into a pickle!' });
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
                    channel.send({ embeds: [reactionEmbedDev] }).then((m) => {
                        addReactions(m, reactionsI);
                    })
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
                    }
                    else if (titleEmbed.includes("interesses")){
                        message[1].edit({ embeds: [reactionEmbedDev]});
                        await addReactions(message[1], reactionsI);
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