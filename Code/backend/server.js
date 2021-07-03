require('dotenv').config({
    path: `.env.${ process.env.NODE_ENV }`
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./snackability-webapp-firebase-adminsdk-h60le-4728fc7268.json");

const authRoutes = require('./routes/auth.routes');
const usdaRoutes = require('./routes/usda.routes');
const scoreRoutes = require('./routes/score.routes');

const decodeIdToken = require('./middlewares/decodeToken');

const PORT = process.env.PORT;
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth', authRoutes);
app.use('/usda', usdaRoutes);
app.use('/score', decodeIdToken, scoreRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
