const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/login', async (req, res, next) => {

   const email = req.body.email;
   const password = req.body.password;

   if(!email || !password) {
       res.status(400);
       res.send("Missing username or password");
   }

   try {
       const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
       res.send({
           token: await userCredential.user.getIdToken(),
       });
   } catch (error) {
       res.send(error);
   }

});

router.post('/signup', async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(400);
        res.send("Missing username or password");
    }

    try {
        const userCredential = await admin.auth().createUserWithEmailAndPassword(email, password);
        res.send({
            token: await userCredential.user.getIdToken()
        });
    } catch (error) {
        // res.status(error.code);
        // res.send(error.message);
    }

});

router.post('/logout', async (req, res, next) => {

    try {
        const result = await admin.auth().signOut();
        res.status(204);
        res.send();
    } catch(error) {
        // res.status(error.code);
        // res.send(error.message);
    }

});


module.exports = router;
