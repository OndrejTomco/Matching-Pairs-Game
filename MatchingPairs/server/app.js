require('dotenv').load();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Scores = require('./models/score.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/storeScore', (req, res, next) => {
    console.log(req.body);

    let newScore = new Scores({
        Name: req.body.Name,
        Score: req.body.Score,
        Missed: req.body.Missed,
        Difficulty: req.body.Difficulty
    });

    newScore.save().then((score) => {
    }).then((saved) => {
        res.json({
            message: 'score saved'
        })
    })
})

app.get('/highscores', (req, res, next) => {

    Scores.find().sort({ Score: -1 }).limit(10)
        .then((scores) => {
            console.log(scores);
            res.json(scores);
        })
})

app.listen(5000, () => {
    console.log('running');
})