const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let firstIngredient = new Schema({
	category: { type: String },
	first_ing_name: { type: String },
});

module.export = mongoose.model('first_ingredient', firstIngredient);
