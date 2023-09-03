const express = require('express')
const mongoose = require('mongoose')
const app = express();
const Contestant = require('./models:Contestant');

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

app.post('/contestants', async (req, res) => {
    try {
        const contestant = new Contestant(req.body);
        await contestant.save();
        res.status(201).send({ message: "Contestant registered!"});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/contestants', async (req, res) => {
    const { sortedByName } = req.query;
    let contestants;

    if (sortedByName === 'true') {
        contestants = await Contestant.find().sort('contestantName');
    } else {
        contestants = await Contestant.find();
    }

    const response = contestants.map(c => ({
        contestantName: c.contestantName,
        husbandName: c.husbandName,
    }));
    res.json({ pairs:response});
});


