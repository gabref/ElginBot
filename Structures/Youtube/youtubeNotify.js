const cron = require('cron') 
const axios = require('axios')
const { WebhookClient, MessageEmbed } = require('discord.js')
const spawn = require('child_process').spawn
const videosDB = require('../Schemas/YoutubeUpdates')
const mongoose = require('mongoose')
const databaseURL = process.env.DATABASEURL

// connectDB()

let runScript = new cron.CronJob('*/20 * * * * *', youtubeSearch)
runScript.start()

async function youtubeSearch() { 

    
    let scriptOutput = ""

    const pythonProcess = spawn('python', ['youtube-search.py'])
    pythonProcess.stdout.setEncoding('utf8')
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput = JSON.parse(data)
        if(scriptOutput.error === "false"){
            console.log(scriptOutput)
            videoAlreadySent(scriptOutput.id,
                             scriptOutput.linkVideo,
                             scriptOutput.thumbnail,
                             scriptOutput.title,
                             scriptOutput.thumbnail,
                             scriptOutput.channel)
        } else {
            console.log(scriptOutput.error)
        }
    })
    pythonProcess.on('close', (code) => {
        console.log('closing code: ' + code)
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

        // const dados = await videosDB.findOne({ id: _id })

        // if (dados) {
        //     await videosDB.create(
        //         {
        //             id: _id,
        //             title: _title,
        //             link: _link, 
        //             thumbnail: _thumb,
        //             channel: _channel,
        //         }
        //     )
            console.log('data written to database')

            const data = getData(_link, _icon_url, _title, _thumb, _channel)

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
                .setThumbnail(`${_thumb}`)
                .setDescription(`Fala dev, acabou de sair vídeo novo no canal **${_channel}** \nVai lá assistir "${_title}\"\n[Aqui o vídeo](${_link})`)
        

                webhook.send({embeds: [Embed]})
                .catch(console.error);

            // axios
            // .post('https://discord.com/api/webhooks/940809220188696627/_wiXG_PHhZIbUHFxeg0XikqdT8lIgMNbM8NjRJTW2nbQ4SJ1S71NR5GJfmXrXQXymMIf', {
                // method: "POST",
                // body: JSON.stringify(data),
                // headers: {
                    // 'Content-Type':'application/json',
                // }
            // })
            // .then(res => {
                // console.log(`statusCode: ${res.status}`)
                // console.log(res)
            // })
            // .catch(error => {
                // console.error(error)
            // })

        // } else {
        //     console.log('vídeo já tá lá')
        // }


    } catch (e) {
        console.log("deu falha na matrix da procura youtube")
        console.error(e) 
    }
}

function getData(_link, _icon_url, _title, _thumb, _channel) {
    return {
        "content":"ciao",
        "avatar_url":"https://i.imgur.com/4M34hi2.png",
        "embeds":[
            {
                "title":`${_title}`,
                "url":`${_link}`,
                "description":`Fala dev, acabou de sair vídeo novo no canal **${_channel}** \nVai lá assistir "${_title}\"\n[Aqui o vídeo](${_link})`,
                "color":5174599,
                "thumbnail":{
                    "url":`${_icon_url}`
                },
                "image":{
                    "url":`${_thumb}`
                },
                "footer":{
                    "text":"Woah! So cool! :smirk:",
                    "icon_url":"https://i.ytimg.com/vi/EBYsx1QWF9A/maxresdefault.jpg"
                }
            }
        ]
    }
}