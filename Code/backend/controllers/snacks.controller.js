const Snacks = require('../models/snacks.model');
const firstIngredient = require('../models/first_ingredient.model');

exports.getSnacks = (q) => {
	return Snacks.find({
		$or: [
			{ brand_name: { $regex: q + '.*', $options: 'i' } },
			{ product: { $regex: q + '.*', $options: 'i' } },
		],
	});
};

exports.getSnackByID = (snack_id) => {
	return Snacks.findOne({ _id: snack_id });
};

exports.getIngCategory = (first_ingredient) => {
	return firstIngredient.findOne({ first_ing_name: first_ingredient });
};
