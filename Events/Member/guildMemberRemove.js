const { MessageEmbed, WebhookClient, GuildMember, Message} = require('discord.js')

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member

        const Loger = new WebhookClient({
            id: "936648341369016430",
            token: "ofaTcGN82d0jn7Lql1Ecio9VU4Mymto4xCVTIKYiBkB0fHp_0oVOLd25_JcgS_7GFPFQ"
        })

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor({
            name: user.tag, 
            iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} saiu da comunidade!\n
        Entrou: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nÚltima contagem de membros: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Loger.send({embeds: [Welcome]})
    }
}