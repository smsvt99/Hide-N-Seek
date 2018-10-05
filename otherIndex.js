const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
var fs = require('fs')
const MongoClient = require('mongodb').MongoClient;

const app = express()
const ScoreStore = require('./lib/scoreStore');
let db;

const multer = require('multer')
let upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


const logRequests = function (req, res, next) {
    console.log(`${req.method} @ ${req.url}`)
    next()
}

app.use(logRequests);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/scores', (req, res) => {
    scoreStore.getScores((scores) => {
        scores.forEach((score) => {
            score.playerScore = Number(score.playerScore);
        });
        scores.sort((a, b) => {
            return b.playerScore - a.playerScore;
        });
        let scoreString = JSON.stringify(scores);
        fs.writeFileSync('public/scores.json', scoreString);
        res.send(scores);
    });
});

app.post('/scores', upload.array(), (req, res) => {
    let scoreObject = req.body;
    scoreStore.addScore(scoreObject, () => {
        res.sendFile(__dirname + '/public/scoreBoard.html');
    });
});

let db_uri = process.env.MONGODB_URI

MongoClient.connect(db_uri, { useNewUrlParser: true }, (error, client) => {

    if (error) return console.error('Error connecting to MongoDB: ', error);

    db = client.db('hidenseek');
    scoreStore = new ScoreStore(db);

    app.listen((process.env.PORT || 5001), () => {
        console.log('Listening on port 5001...');
    });
});
