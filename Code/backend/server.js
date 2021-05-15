const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const snackRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');


const PORT = 4000;

require('dotenv').config();

const mongodb_url = process.env.MONGODB_URL;

let Snacks = require('./db/snacks.model');
const { query } = require('express');

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
      var query = { $or: [ {brand_name: {'$regex': input + '.*', '$options': 'i'}}, {product: {'$regex': input + '.*', '$options': 'i'}} ] };
      dbo.collection("snacks").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();

        return result;

      });
    });

});

app.use('/score', function(req, res) {
    const url = mongodb_url;

    var searchID = req.body.searchID;

    var o_id = new ObjectID(searchID)

    result = "";

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("snackability_webapp");

        var queryByID = {_id: o_id}

        dbo.collection("snacks").findOne(queryByID, (err, result) => {
          if (err) throw err;

          res.send(result);
          console.log(result);
          db.close();

          return result;
        });
    });
});

app.use('/scoresnack', function(req, res) {
    const url = mongodb_url;

    var searchID = req.body.searchID;

    result = "";

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("snackability_webapp");

        var queryByID = {_id: searchID}
        console.log(searchID);
        dbo.collection("snacks").find(queryByID).toArray(function(err, result) {
          if (err) throw err;

          res.send(result);
          console.log(result);
          console.log("database results")
          db.close();

          return result;
        });
    });
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

/**var searchID = new ObjectID(req.body.searchID); */
/**           console.log(result); */
