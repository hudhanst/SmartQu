const mongoose = require("mongoose")

const TokenDurationInHours = require("../config/keys").TokenDurationInHours

let ThisTime = new Date()

const TokenSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    ExpiredDate: {
        type: Date,
        default: ThisTime.setHours(ThisTime.getHours() + Number(TokenDurationInHours))
    }
})

module.exports = Token = mongoose.model("Token", TokenSchema)