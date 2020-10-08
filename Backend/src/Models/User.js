const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    ProfilePicture: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    isSuperUser: {
        type: Boolean,
        default: false
    },
    RegisterDate: {
        type: Date,
        default: Date.now
    },
    LastActive: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("User", UserSchema)