const { MessageEmbed, WebhookClient, GuildMember, Message} = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member

        member.roles.add("921446720498434069")
        const Welcomer = new WebhookClient({
            id: "936641166726811668",
            token: "-fAIWh5XSJuHEjcNBFa3akPf22bQGPjx9hVR_6rgYjyIbxHMmshAX4esxBCMkVtNjedK"
        })

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({
            name: user.tag, 
            iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Bem-vindo ${member} para o servidor do **${guild.name}**!\n
        Conta Criada: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nÚltima contagem de membros: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Welcomer.send({embeds: [Welcome]})
    }
}