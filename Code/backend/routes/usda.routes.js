const express = require('express');
const firtIng = require('../helpers/scoringAlgorthim');
const {
	getUSDASnacks,
	getUSDASnackById,
	searchUSDASnack,
} = require('../controllers/usda.controller');
const firstIng = require('../helpers/scoringAlgorthim');

const router = express.Router();

router.get('/snacks', async (req, res, next) => {
	const dataType = req.query.dataType || 'Branded';

	try {
		const snacks = await getUSDASnacks({
			dataType,
		});
		res.json(snacks.data);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

router.get('/snacks/:snack_id', async (req, res, next) => {
	const snack_id = req.params.snack_id;

	if (!snack_id) {
		res.status(400);
		res.send('Missing snack_id');
	}

	try {
		const snack = await getUSDASnackById(snack_id);
		res.json(snack.data.foods);
	} catch (err) {
		console.log(err);
		throw err;
	}
});

router.get('/snack_score', async (req, res, next) => {
	const q = req.query;

	try {
		const snack = await getUSDASnackById(q.snack_id);
		var score = firstIng(snack.ingredients);
		res.send({ firstIngScore: score });
	} catch (err) {
		console.log(err);
		throw err;
	}
});

router.get('/search', async (req, res, next) => {
	const q = req.query.q || '';
	const dataType = req.query.dataType || 'Branded';

	try {
		const snacks = await searchUSDASnack({
			q,
			dataType,
		});
		res.json(snacks.data.foods);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

module.exports = router;
