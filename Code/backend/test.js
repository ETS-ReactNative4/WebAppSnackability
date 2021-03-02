var MongoClient = require('mongodb').MongoClient;

var input = "ito";
var regexInput = new RegExp(input);

MongoClient.connect('mongodb+srv://snackabilityadmin:DSge7blrO0sQ2WuB@cluster0.coira.mongodb.net/snackability_webapp?retryWrites=true&w=majority', function(err, db) {
  if (err) throw err;
  var dbo = db.db("snackability_webapp");
  var query = { brand_name: regexInput };
  dbo.collection("snacks").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
