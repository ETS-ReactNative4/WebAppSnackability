const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10
};

let connection = null;

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, options, (err, db) => {
            if(err) {
                reject(err);
            } else {
                resolve(db);
                connection = db;
            }
        })
    })
}

exports.get = () => {
    if(!connection) {
        throw new Error("Not connected to mongodb");
    }
    return connection;
}
