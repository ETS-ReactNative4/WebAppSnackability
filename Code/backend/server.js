const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const snackRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;

const PORT = 4000;

require('dotenv').config();

const mongodb_url = process.env.MONGODB_URL;

let Snacks = require('./snacks.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    mongodb_url, 
    { useNewUrlParser: true, useUnifiedTopology: true});
    
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully")
})

snackRoutes.route('/').get(function(req,res) {
    Snacks.find(function(err, snacks) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(snacks);
        }
    })
})


app.use('/snacks', snackRoutes);

app.use('/id', function(req, res) {
    const url = mongodb_url;

    searchWord = req.body.searchWord;
    
    console.log(searchWord);
    var input = searchWord;
    result = "";

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("snackability_webapp");
      var query = { brand_name: {'$regex': input + '.*', '$options': 'i'} };
      dbo.collection("snacks").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();

        return result;

      });
    });    

});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
