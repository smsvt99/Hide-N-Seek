// var fs = require('fs');
// var http = require('http');
// var mime = require('mime-types');


// var port = process.env.PORT || 5001;

// http.createServer(function (request, response) {
//     let contentType = 'text/plain'
//     let data;
//     let path = request.url;


//     if (path === '/') {
//         file = 'index.html';
//         MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//             assert.equal(null, err);
//             console.log("Connected successfully to server");

//             const db = client.db(dbName);

//             getDocuments(db, function (documents) {

//                 documents.sort(function (a, b) {
//                     return b.playerScore - a.playerScore
//                 })

//                 let scoreString = JSON.stringify(documents)
//                 fs.writeFileSync('scores.json', scoreString)
//                 client.close();
//             });
//         });
//     }
//     if (request.method === 'POST' && path === '/scores') {
//         file = 'scoreBoard.html';
//         console.log('did a post')
//         let theBody = '';
//         request.on('data', chunk => {
//             theBody += '{"' + chunk + '"}'
//             theNewerBody = theBody.replace(/&/g, '","')
//             theNewestBody = theNewerBody.replace(/%2F/g, '/')
//             theNewestestBody = theNewestBody.replace(/=/g, '":"')
//             parsedBody = JSON.parse(theNewestestBody)

//             MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//                 if (err) {
//                     console.log('E R R O R: : ' + err)
//                 }
//                 assert.equal(null, err);
//                 console.log("Connected successfully to server");

//                 const db = client.db(dbName);

//                 insertDocuments(db, function () {
//                     getDocuments(db, function (documents) {

//                         documents.sort(function (a, b) {
//                             return b.playerScore - a.playerScore
//                         })

//                         let scoreString = JSON.stringify(documents)
//                         fs.writeFileSync('scores.json', scoreString)
//                         client.close();
//                     });
//                 });
//             });
//         });

//         request.on('end', () => {
//             response.end('ok');
//         });
//     }

//     else if (path.indexOf('.') === -1) {
//         file = 'index.html';
//     }

//     else {
//         file = '.' + decodeURIComponent(request.url);
//     }

//     try {
//         if (file) {
//             console.log('Serving ' + file);
//             data = fs.readFileSync(file);
//             contentType = mime.lookup(file);
//             console.log('file: ')
//         }
//     } catch (error) {
//         console.log(error);

//         data = "Error: " + error.toString();
//         response.statusCode = 404;
//     }
//     response.setHeader('Content-Type', contentType + '; charset=utf-8');
//     response.write(data);
//     response.end();

// }).listen(port);

// console.log("Listening on port " + port);

//MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO MONGO

const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const multer = require('multer')
const app = express()
var fs = require('fs')

const dbName = 'hidenseek';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())


const logRequests = function (req, res, next) {
    console.log(`${req.method} @ ${req.url}`)
    next()
}

const getFromMongo = function (req, res, next) {
    if (req.url === '/') {
        console.log('Serving index, talking to Mongo')

        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);

            getDocuments(db, function (documents) {

                documents.sort(function (a, b) {
                    return b.playerScore - a.playerScore
                })
                let scoreString = JSON.stringify(documents)
                fs.writeFileSync('public/scores.json', scoreString)
                client.close();
            });
        });
    }
    next()
}
const giveToMongo = function (req, res, next) {
    if (req.url === "/scores" && req.method === 'POST') {
        console.log('made it to /scores')
        req.on('data', chunk => {
            let theBody = ''
            theBody += '{"' + chunk + '"}'
            theNewerBody = theBody.replace(/&/g, '","')
            theNewestBody = theNewerBody.replace(/%2F/g, '/')
            theNewestestBody = theNewestBody.replace(/=/g, '":"')
            parsedBody = JSON.parse(theNewestestBody)
            console.log(parsedBody)

            MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                if (err) {
                    console.log('E R R O R: : ' + err)
                }
                assert.equal(null, err);
                console.log("Connected successfully to server");

                const db = client.db(dbName);

                insertDocuments(db, function () {
                    getDocuments(db, function (documents) {

                        documents.sort(function (a, b) {
                            return b.playerScore - a.playerScore
                        })

                        let scoreString = JSON.stringify(documents)
                        fs.writeFileSync('public/scores.json', scoreString)
                        client.close();
                    });
                });
            });
        }
        )
    }
    next()
}


app.use(getFromMongo)
app.use(giveToMongo)
app.use(logRequests)
app.use(express.static('public'))

app.post('/scores'), (req, res) => {
    res.send('fuck ya motha')
    res.sendFile('scoreBoard.html')
}

app.listen(5001, function () {
    console.log('listening on port 5001...')
})


const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('scoreboard');
    // Insert some documents
    collection.insertMany([

        parsedBody

    ], function (err, result) {
        console.log("Inserted documents into the collection");
        callback(result);
    });
}

function getDocuments(db, callback) {
    cursor = db.collection("scoreboard").find({}).toArray((error, documents) => {
        if (error) {
            console.log(error)
        }
        callback(documents)
    })
}


// Connection URL
// const url = 'mongodb://everyman:everyman1@ds255308.mlab.com:55308/hidenseek';
const url = process.env.MONGODB_URI || 'mongodb://everyman:everyman1@ds255308.mlab.com:55308/hidenseek?connectTimeoutMS=300000&retryWrites=true'

