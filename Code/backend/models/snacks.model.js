const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Snacks = new Schema({
    brand_name: {
        type: String
    },
    product: {
        type: String
    },
    short_name: {
        type: String
    },
    serving_size: {
        type: Number
    },
    calories: {
        type: Number
    },
    calories_fat: {
        type: Number
    },
    saturated_fat: {
        type: Number
    },
    trans_fat: {
        type: Number
    },
    sodium: {
        type: Number
    },
    sugar: {
        type: Number
    },
    first_ingredient: {
        type: String
    },
    processed: {
        type: String
    }
});

module.exports = mongoose.model('Snacks', Snacks);