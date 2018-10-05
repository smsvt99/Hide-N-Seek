let ObjectId = require('mongodb').ObjectID;

module.exports = class ScoreStore {
    constructor(db) {
        this.db = db;
        this.collection = db.collection('scoreboard');
    }

    getScores(callback) {
        let cursor = this.collection.find({});
        cursor.toArray((error, documents) => {
            if (error) {
                console.log(error);
            }
            callback(documents);
        });
    }

    addScore(scoreObject, callback) {
        this.collection.insertOne(scoreObject, (error, result) => {
            if (error) return console.error(error);
            callback();
        });
    }
}