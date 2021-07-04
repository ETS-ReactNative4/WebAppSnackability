require('dotenv').config({
    path: `.env.${ process.env.NODE_ENV }`
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccount.json");

const usdaRoutes = require('./routes/usda.routes');
const scoreRoutes = require('./routes/score.routes');

const decodeIdToken = require('./middlewares/decodeToken');

const PORT = process.env.PORT;
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json());

app.use('/usda', decodeIdToken, usdaRoutes);
app.use('/score', decodeIdToken, scoreRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
