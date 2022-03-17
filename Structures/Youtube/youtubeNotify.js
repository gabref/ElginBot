const cron = require('cron') 
const { WebhookClient, MessageEmbed } = require('discord.js')
const spawn = require('child_process').spawn
const videosDB = require('../Schemas/YoutubeUpdates')
const mongoose = require('mongoose')
const { performChannelPageRequestWithFallbacks } = require('yt-channel-info/app/helper')
const { childrenIgnored } = require('glob/common')
const { resolve } = require('path')
const { rejects } = require('assert')
const databaseURL = process.env.DATABASEURL

connectDB()

let runScript = new cron.CronJob('*/20 * * * * *', youtubeSearch)
runScript.start()

async function youtubeSearch() { 
    console.time('codezup')
    spawnChild().then(
       data => {
           console.log("async result:\n" + data);
           scriptOutput = JSON.parse(data)
            if(scriptOutput.error === "false"){
                videoAlreadySent(scriptOutput.id,
                                scriptOutput.linkVideo,
                                scriptOutput.thumbnail,
                                scriptOutput.title,
                                scriptOutput.thumbnail,
                                scriptOutput.channel)
            } else {
                console.log(scriptOutput.error)
            }    
        },
       err =>  {console.error("async error:\n" + err);}
   );   
   console.timeEnd('codezup')
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

async function spawnChild(){
    try {
        
        let scriptOutput = ""
    
        const pythonProcess = spawn('python', ['youtube-search.py'])
        pythonProcess.stdout.setEncoding('utf8')
        
        let data = ""
        for await (const chunk of pythonProcess.stdout) {
            console.log('stdout chunk: ' + chunk)
            data += chunk
        }
        let error = ""
        for await (const chunk of pythonProcess.stderr) {
            console.error('stdeer chunk: ' + chunk)
            error += chunk
        }
        const exitCode = await new Promise( (resolve, reject) => {
            pythonProcess.on('close', resolve)
        })
        if (exitCode) {
            throw new Error(`subprocess error exit ${exitCode}, ${error}`)
        }
        return data
        
    } catch (error) {
        console.log('erro no processo python: ', error)     
    }
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
            console.log('data written to database')

            const id = process.env.YOUTUBE_WEBHOOK_ID
            const token = process.env.YOUTUBE_WEBHOOK_TOKEN
            const webhook = new WebhookClient({id, token}) 
            
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
