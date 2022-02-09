const { model, Schema } = require('mongoose')

module.exports = model("BottomMessages", new Schema({
    ChannelID: String,
    MessageID: String,
    MessageDescription: String,
}))