const { Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);

            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🛑 An error occured while running this command.')
            ]}) && client.command.delete(interaction.commandName)

            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({ content: `Você não tem as permissões necessárias para usar esse comando: \`${interaction.commandName}\`.`, ephemeral: true })
            }
            command.execute(interaction, client)
        }
    }
}