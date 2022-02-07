const { CommandInteraction, MessageEmbed } = require('discord.js');
const { userInfo } = require('os');

module.exports = {
    name: "serverinfo",
    description: "ServerInfo",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { guild } = interaction;

        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;

        const Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor({ name: guild.name, iconURL: guild.iconURL({dynamic: true})})
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setFields(
            {
                name: "GENERAL",
                value: [
                    `Name: ${guild.name}`,
                    `Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                    `Owner: <@${ownerId}>\n`,
                    `Description: ${description}\n`
                ].join("\n")
            },
            {
                name: "💡 | USUÁRIOS",
                value: [
                    `\n`,
                    `- Cargos: ${guild.roles.cache.size}`,
                    `- Membros: ${members.cache.filter((m) => !m.user.bot).size}`,
                    `- Bots: ${members.cache.filter((m) => m.user.bot).size}`,
                    `- Total: ${memberCount}`
                ].join("\n")
            },
            {
                name: "🕋 | CANAIS",
                value: [
                    `- Texto: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
                    `- Voz: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
                    `- Threads: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}`,
                    `- Categorias: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
                    `- Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
                    `- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,
                    `- Total: ${channels.cache.size}`,
                ].join("\n")
            },
            {
                name: "😃 | EMOJIS & STICKERS",
                value: [
                    `Animados: ${emojis.cache.filter((e) => e.animated).size}`,
                    `Estáticos: ${emojis.cache.filter((e) => !e.animated).size}`,
                    `Stickers: ${stickers.cache.size}`,
                    `Total: ${stickers.cache.size + emojis.cache.size}`,
                ].join("\n")
            },
            {
                name: "✨ | NITRO",
                value: [
                    `- Tier: ${guild.premiumTier.replace("TIER_", "")}`,
                    `- Boosts: ${guild.premiumSubscriptionCount}`,
                    `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`,
                ].join("\n")
            }
        )
        .setFooter({ text: "Última checkagem:" }).setTimestamp();

        interaction.reply({embeds: [Embed]})    
    }
}