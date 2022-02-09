const { GuildMember } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const channelId = "941043359785570314";

        const channel = member.guild.channels.resolve(channelId);
        await channel.setName(`Membros: ${member.guild.memberCount.toLocaleString()}`)
    }
}