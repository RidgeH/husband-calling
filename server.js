const express = require('express')
const mongoose = require('mongoose')
const app = express();
const Contestant = require('./ContestantAbstraction.js');

mongoose.connect('mongodb://localhost:27017/husbandCalling', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB'))

app.use(express.json());

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

// Register contestants
app.post('/contestants', async (req, res) => {
    try {
        const contestant = new Contestant(req.body);
        await contestant.save();
        res.status(201).send({ message: "Contestant registered!"});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get contestants
app.get('/contestants', async (req, res) => {
    
    contestants = await Contestant.find();

    const response = contestants.map(c => ({
        contestantName: c.contestantName,
        husbandName: c.husbandName,
    }));
    res.json({ pairs: response});
});

// Performing Husband Call

app.get('/husbandCall/:contestantName', async (req, res) => {
    try {
        const { contestantName } = req.params;
        const contestant = await Contestant.findOne({ contestantName });

        if (!contestant) {
            return res.status(404).send({ error: 'Contestant not found' });
        }

        let score = 0;

        if (contestant.vocalRange < contestant.location) {
            return res.status(400).send({ error: 'Vocal range is too short' })
        } else if (contestant.vocalRange === contestant.location) {
            score = contestant.location;
        } else {
            score = Math.abs(contestant.location - contestant.vocalRange);
        }
        res.json({ score });
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
});


