const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const snackRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const PORT = 4000;



let Snacks = require('./snacks.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    'mongodb+srv://snackabilityadmin:DSge7blrO0sQ2WuB@cluster0.coira.mongodb.net/snackability_webapp?retryWrites=true&w=majority', 
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

snackRoutes.route('/:id').get(function(req,res) {
    let id = req.params.id;
    Snacks.findById(id, function(err, snacks) {
        res.json(snacks)
    }) 
})

snackRoutes.route('/add').post(function(req,res) {
    let snacks = new Snacks(req.body);
    snacks.save()
        .then(snacks => {
            res.status(200).json({'snacks': 'snacks added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new snacks failed');
        })
})

snackRoutes.route('/update/:id').post(function(req,res){
    Snacks.findById(req.params.id, function(err, snacks){
        if (!snacks)
            res.status(404).send('data is not found');
        else    


            snacks.save().then(snacks => {
                res.json('Snacks updated');
            })
            .catch(err => {
                res.status(400).send("Update is not possible");
            })
    })
})

app.use('/snacks', snackRoutes);

app.post('/id', function(req, res) {
    searchWord = req.body.searchWord;

    search = res.status(200).send({ msg: searchWord });

    console.log(searchWord);
    var input = searchWord;
    
    MongoClient.connect('mongodb+srv://snackabilityadmin:DSge7blrO0sQ2WuB@cluster0.coira.mongodb.net/snackability_webapp?retryWrites=true&w=majority', function(err, db) {
      if (err) throw err;
      var dbo = db.db("snackability_webapp");
      var query = { brand_name: {'$regex': input + '.*', '$options': 'i'} };
      dbo.collection("snacks").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });    
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.post('/search', (req,res) => {
    const searchWord = req.params.searchWord;

    console.log("search in back end");
    res.status(200).send({ msg: searchWord });
});

