const { MessageEmbed, WebhookClient, GuildMember, MessageAttachment } = require('discord.js')
const Canvas = require('canvas')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        
        const { user, guild } = member

        member.roles.add("921446720498434069")
        const Welcomer = new WebhookClient({
            id: "936641166726811668",
            token: "-fAIWh5XSJuHEjcNBFa3akPf22bQGPjx9hVR_6rgYjyIbxHMmshAX4esxBCMkVtNjedK"
        })

        const welcomeCanvas = Canvas.createCanvas(1280/2, 595/2)
        const ctx = welcomeCanvas.getContext('2d')

        const cw = welcomeCanvas.width
        const ch = welcomeCanvas.height
        const cx = cw / 2
        const cy = ch / 4.2
        const cr = (ch / 2.6) / 2

        ctx.font = '72px sans-serif'
        ctx.fillStyle = '#ffffff'

        const background = await Canvas.loadImage('./Structures/Images/background.jpeg')
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, cw, ch);

        // titulo card
        // elgin
        const wr = cw / 2 - cr - 40
        const wh = wr / 2.3394
        const logoImageElgin = await Canvas.loadImage('./Structures/Images/logotipo_branco_positivo_1.png')
        const logoImageDC = await Canvas.loadImage('./Structures/Images/logotipo_branco_positivo_2.png')
        ctx.drawImage(logoImageElgin, 20, cy - (wh / 2), wr, wh)
        ctx.drawImage(logoImageDC, cw / 2 + cr + 30, cy - (wh / 2) + 10, wr - 20, wh)

        // bem vindo
        ctx.textAlign = 'center'
        ctx.font = '50px sans-serif'
        ctx.fillText('Bem Vindo', cw / 2, ch / 1.6)

        // draw circle for user image
        ctx.beginPath()
        ctx.arc(cx, cy, cr, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fill()

        ctx.font = '28px sans-serif'
        ctx.fillText(`${user.tag}`, cw / 2, ch / 1.3)

        ctx.font = '22px sans-serif'
        ctx.fillText(`Agora somos ${guild.memberCount} usuários`, cw / 2, ch / 1.125)

        ctx.beginPath()
        ctx.arc(cx, cy, cr - 5, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.clip()

        const userImage = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 1024 }))
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(userImage, cx - cr, cy - cr, 2 * cr, 2 * cr);
    
        // Use the helpful Attachment class structure to process the file for you
        const attachment = new MessageAttachment(welcomeCanvas.toBuffer(), `welcome-${member.id}.png`);
    
        Welcomer.send({ files: [attachment] });
        
    }
}