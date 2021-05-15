const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { getSnackByID, getSnacks } = require('../controllers/snacks.controller');

router.get('/', async (req,res, next) => {

    const q = req.query.q || "";

    try {
        const snacks = await getSnacks(q);
        res.json(snacks);
    } catch (err) {
        console.log(err)
        res.send(err);
    }

});

router.get('/:snack_id', async (req, res, next) => {

    const snack_id = req.params.snack_id;

    if(!snack_id) {
        res.status(400);
        res.send("Missing snack_id");
    }

    try {
       const snack = await getSnackByID(snack_id)
       res.json(snack);
    } catch (err) {
        console.log(err)
        throw err;
    }

});

module.exports = router;
