const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/graph', async (req, res, next) => {

    const user_id = req.currentUser.uid;

    try {

        const db = admin.firestore();
        const snapshot = await db.collection('score')            
            .where('user_id', '==', user_id)            
            .get();
        
        if(snapshot.empty) {
            res.send([]);
        } else {
            const scores = [];
            snapshot.forEach(doc => {
                scores.push(doc.data());
            });         
            res.send(scores);
        }

    } catch(e) {
        console.log(e);
    }

});

router.post('/consume', async (req, res, next) => {    
    const snack_id = req.body.params.snack_id;
    const score = req.body.params.score;
    const user_id = req.currentUser.uid;
    const created_at = new Date();            

    if(snack_id && score) {

        try {

            const db = admin.firestore();
            await db.collection('score')
               .doc()
               .set({ snack_id, score, created_at, user_id });

            res.send();

        } catch (e) {
            console.log(e);
        }

    } else {

        res.status(400);
        res.send("Missing snack_id or score");

    }

});

module.exports = router;
