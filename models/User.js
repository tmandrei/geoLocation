const { Schema, model } = require('mongoose')

const user = new Schema({
    username: { type: String},
    password: { type: String },
    gamedata: { type: Array },
})

module.exports = model('users', user)