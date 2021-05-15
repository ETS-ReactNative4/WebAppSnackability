const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db');

const snacksRoutes = require('./routes/snacks.routes');
const Snacks = require('./models/snacks.model');

const PORT = 4000;

db.connect()
  .then(() => console.log("Database connected"))
  .catch((e) => console.error(e));

app.use(cors());
app.use(bodyParser.json());
app.use('/snacks', snacksRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
