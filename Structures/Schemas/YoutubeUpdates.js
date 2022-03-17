const { model, Schema } = require('mongoose')

module.exports = model("YoutubeUpdates", new Schema({
    id: String,
    title: String,
    link: String, 
    thumbnail: String,
    channel: String, 
}))