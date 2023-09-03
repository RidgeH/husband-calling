const mongoose = require('mongoose')

const contestantSchema = new mongoose.Schema({
    contestantName: { type: String, required: true, unique: true },
    husbandName: {type: String, required: true, unique: true }, 
    vocalRange: {type: Number, required:true }, 
    location: { type: Number, required: true },
});

module.exports = mongoose.model('Contestant', contestantSchema);