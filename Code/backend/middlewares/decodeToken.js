const admin = require('firebase-admin');

async function decodeIDToken(req, res, next) {

    if (req.header('access-token')) {

        const idToken = req.header('access-token');

        try {

            req['currentUser'] = await admin.auth().verifyIdToken(idToken);
            next();

        } catch (err) {

            res.status(401);
            res.send("Invalid token.");

        }

    } else {

        res.status(400);
        res.send("Missing token");

    }

}

module.exports = decodeIDToken;
