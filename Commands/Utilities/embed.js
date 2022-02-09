const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "create-embed",
    description: "Enviar Embeds para um canal",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "escolha um canal",
            required: true,
        },
        {
            name: "title",
            type: "STRING",
            description: "escolha um titulo",
            required: true,
        },
        {
            name: "description",
            type: "STRING",
            description: "escolha uma descricao",
            required: true,
        },
        {
            name: "footer",
            type: "STRING",
            description: "escolha um footer",
            required: true,
        },
        {
            name: "image",
            type: "STRING",
            description: "url de uma imagem"
        },
        {
            name: "thu",
            type: "STRING",
            description: "url de uma imagem para thumbnail"
        },
    ],
    /**
     *  
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
        const { options } = interaction;

        const channelID = options.getChannel("channel");  
        const title = options.getString("title");  
        const descriptionE = options.getString("description");  
        const footer = options.getString("footer");
        const image = options.getString("image") || "";
        const thu = options.getString("thu") || "";

        const Embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(descriptionE)
            .setColor("RANDOM")
            .setFooter({ text: footer })
            .setImage(image)
            .setThumbnail(thu);

        await channelID.send({ embeds: [Embed] });

        interaction.reply({ content: "O seu Embed foi enviado", ephemeral: true })
    }
}