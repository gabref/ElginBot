const { CommandInteraction, Client, MessageEmbed } = require('discord.js')
const { connection } = require('mongoose')
require("../../Events/Clients/ready")
var logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "status",
    description: "Mostrar o estado do cliente e a conexão à base de dados.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Banco de dados**: \`${switchTo(connection.readyState)}\``)

        interaction.reply({embeds: [Response]})

        logger.info("Finalizado comando 'status'")    
    }
}

function switchTo(val) {
    var status = " "
    switch(val) {
        case 0 : status = "🔴 DESCONECTADO"
        break;
        case 1 : status = "🟢 CONECTADO"
        break;
        case 2 : status = "🟠 CONECTANDO"
        break;
        case 3 : status = "🟣 DESCONECTANDO"
        break;
    }
    return status
}