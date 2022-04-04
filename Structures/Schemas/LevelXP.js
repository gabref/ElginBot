const { model, Schema } = require('mongoose')

const UserXPSchema = new Schema({
    UserID: String,
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    ultimoXP: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = model("UserXP", UserXPSchema)