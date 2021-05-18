require('dotenv').config({
    path: `.env.${ process.env.NODE_ENV }`
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db');

const snacksRoutes = require('./routes/snacks.routes');
const usdaRoutes = require('./routes/usda.routes');

const Snacks = require('./models/snacks.model');

const PORT = process.env.PORT;
const app = express();

db.connect()
  .then(() => console.log("Database connected"))
  .catch((e) => console.error(e));

app.use(cors());
app.use(bodyParser.json());
app.use('/snacks', snacksRoutes);
app.use('/usda', usdaRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
