const { ContextMenuInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "userinfo",
    type: "USER",
    context: true,
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({
            name: target.user.tag,
            iconURL: target.user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Cargos", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
        .addField("Membro Desde", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User Desde", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({embeds: [Response], ephemeral: true})
    }
}