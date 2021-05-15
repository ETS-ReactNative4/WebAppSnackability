const { config } = require('../config/config');
const axios = require('axios');

exports.getUSDASnacks = () => {
    return axios(`${config.usda.endpoint}/foods/list?api_key=${config.usda.api_key}`);
}

exports.getUSDASnackById = (food_id) => {
    return axios(`${config.usda.endpoint}/food/${food_id}?api_key=${config.usda.api_key}`);
}

exports.searchUSDASnack = (q) => {
    return axios(`${config.usda.endpoint}/foods/search?query=${q}&api_key=${config.usda.api_key}`);
}
