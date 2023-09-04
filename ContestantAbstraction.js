const mongoose = require('mongoose')

const contestantSchema = new mongoose.Schema({
    contestantName: { 
        type: String, 
        required: [true, "You are missing the contestant's name!"], 
        unique: true 
    },
    husbandName: {
        type: String, 
        required: [true, "You are missing the contestant's husband's name!"], 
        unique: true 
    }, 
    vocalRange: {
        type: Number, 
        required:[true, "You are missing the contestant's vocal range!"] 
    }, 
    location: { 
        type: Number, 
        required: [true, "You are missing the husband's location from the contestant zone!"] 
    },
});

module.exports = mongoose.model('Contestant', contestantSchema);