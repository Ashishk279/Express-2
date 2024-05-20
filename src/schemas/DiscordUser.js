const mongoose = require('mongoose');
const DiscordUserSchema = new mongoose.Schema({
  
    discordId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    }
})


module.exports = mongoose.model('discord_users', DiscordUserSchema)