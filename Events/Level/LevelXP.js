const { Message, MessageAttachment } = require('discord.js');
const Canvas = require('canvas')
const DB = require('../../Structures/Schemas/LevelXP')

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message 
     */
    async execute(message) {
        if(message.content.startsWith('\\')) return
        if(message.channel.type == "DM") return
        if(message.author.bot) return 
        
        try {
            const dados = await DB.findOne({ UserID: message.author.id })

            if(!dados) {
                await DB.create({ UserID: message.author.id })
            } else if (Date.now() - dados.ultimoXP > 1000 * 60 * 1){
                const xp = dados.xp + Math.floor(Math.random() * 26) + 15
                let level = dados.level
                console.log(dados.xp)
                console.log(xp)
                
                if (xp >= XpsNecessarios(level + 1)) {
                    level++

                    const canal = message.guild.client.channels.cache.get('922526507988029450')
                    canal.send(`<@${message.author.id}> você alcançou o nível ${level}`)
                    createCanvas(level, xp, XpsNecessarios(level + 1), message.member, canal)
                }
                await DB.updateOne({ UserID: message.author.id }, 
                                               { xp: xp, level: level, ultimoXP: Date.now() })
            }
        } catch (e) {
            console.log(e);
        }
       
    }
}

function XpsNecessarios(level) {
    // const nextLevel = 5000 * (Math.pow(2, score.level) - 1)
    const xpNecessarioAte10 = [0, 70, 150, 180, 220, 260, 300, 1950, 2500, 3000, 3900]

    if (level < 10) {
        return xpNecessarioAte10[level]
    }
    else {
        return level * level * 50
    }
}

async function createCanvas(level, xp, xpObjetivo, name, channel) {
    const xpBarra = (xpObjetivo - xp) / xpObjetivo * 490

    const canvas = Canvas.createCanvas(800, 300)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('./Structures/Images/background.jpeg')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#74037b'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // texto
    ctx.font = '40px calibri'
    ctx.fillStyle = '#000000'
    ctx.fillText(`${name.user.username}`, 255, 120)
    ctx.fillText(`Level : ${level}`, 630, 50)
     
    // barras brancas
    // abertura da forma
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.fillStyle = '#fff'
    // ponto de início
    ctx.moveTo(220, 135)
    ctx.lineTo(690, 135)
    ctx.quadraticCurveTo(710, 135, 710, 152.5)
    ctx.quadraticCurveTo(710, 170, 690, 170)
    ctx.lineTo(220, 170)
    ctx.lineTo(220, 135)
    ctx.fill()
    ctx.closePath()

    // barra xps
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.fillStyle = '#ff5555'
    // ponto de início
    ctx.moveTo(220, 135)
    ctx.lineTo(220 + xpBarra-20, 135)
    ctx.quadraticCurveTo(220 + xpBarra, 135, 220 + xpBarra, 152.5)
    ctx.quadraticCurveTo(220 + xpBarra, 170, 220 + xpBarra-20, 170)
    ctx.lineTo(220, 170)
    ctx.lineTo(220, 135)
    ctx.fill()
    ctx.font = '30px calibri'
    ctx.fillStyle = '#000'
    ctx.fillText(`${xp} / ${xpObjetivo} xp`, 230, 162)
    ctx.closePath()

    // arco
    ctx.beginPath()
    ctx.arc(125, 150, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    const avatar = await Canvas.loadImage(name.user.displayAvatarURL({ format: 'png', size: 1024 }))
    ctx.drawImage(avatar, 25, 50, 200, 200)

    const attachment = new MessageAttachment(canvas.toBuffer(), `level-${level}-${name.user.tag.replace('.', '')}.png`)

    channel.send({ files: [attachment] })
}