const cron = require('cron') 
const logger = require('../../Systems/Logs').Logger
const { WebhookClient, MessageEmbed } = require('discord.js')
const spawn = require('child_process').spawn
const videosDB = require('../Schemas/YoutubeUpdates')
const mongoose = require('mongoose')
const databaseURL = process.env.DATABASEURL

connectDB()

let runScript = new cron.CronJob('*/20 * * * * *', youtubeSearch)
runScript.start()

async function youtubeSearch() { 

    
    let scriptOutput = ""

    const pythonProcess = spawn('python', ['youtube-search.py'])
    pythonProcess.stdout.setEncoding('utf8')
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput = JSON.parse(data)
        if(scriptOutput.error === "false"){
            videoAlreadySent(scriptOutput.id,
                             scriptOutput.linkVideo,
                             scriptOutput.thumbnail,
                             scriptOutput.title,
                             scriptOutput.thumbnail,
                             scriptOutput.channel)
        } else {
            logger.error(scriptOutput.error)
        }
    })
    pythonProcess.on('close', (code) => {
        logger.info('closing code: ' + code)
    })
}

function connectDB(){
    mongoose.connect(databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The Youtube Notifier is now connected to database")
    }).catch((err) => {
        console.log(err)
    })
}

async function videoAlreadySent(_id, _link, _icon_url, _title, _thumb, _channel){
    try {
        const dados = await videosDB.findOne({ id: _id })

        if (!dados) {
            await videosDB.create(
                {
                    id: _id,
                    title: _title,
                    link: _link, 
                    thumbnail: _thumb,
                    channel: _channel,
                }
            )
            logger.info('data written to database')
            console.log('data written to database')

            const id = '940809220188696627';
            const token = '_wiXG_PHhZIbUHFxeg0XikqdT8lIgMNbM8NjRJTW2nbQ4SJ1S71NR5GJfmXrXQXymMIf';
            const webhook = new WebhookClient({id, token}); 
            
            const Embed = new MessageEmbed()
                .setTitle("Vídeo novoo")
                .setAuthor({
                    name: `${_channel}`,
                    iconURL: `${_icon_url}`
                })
                .setURL(`${_link}`) 
                .setColor('RANDOM')
                .setImage(`${_thumb}`)
                .setThumbnail(`${_thumb}`)
                .setDescription(`Fala dev, acabou de sair vídeo novo no canal **${_channel}** \nVai lá assistir "${_title}\"\n[Aqui o vídeo](${_link})`)
        
                webhook.send({embeds: [Embed]})
                .catch(console.error);

        } else {
            console.log('vídeo já tá lá')
        }


    } catch (e) {
        console.log("deu falha na matrix da procura youtube")
        console.error(e) 
    }
}
