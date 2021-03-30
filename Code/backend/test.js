const { MongoClient, ObjectID } = require('mongodb');

var input = "60207f84a8241d2bb8034237";

const url = "mongodb+srv://snackabilityadmin:DSge7blrO0sQ2WuB@cluster0.coira.mongodb.net/snackability_webapp?retryWrites=true&w=majority"

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("snackability_webapp");
  var o_id = new ObjectID(input);
  console.log(o_id)
  dbo.collection("snacks").find(o_id).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});