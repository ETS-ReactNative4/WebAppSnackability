const { config } = require('../config/config');
const axios = require('axios');

const endpoint = process.env.USDA_API_ENDPOINT;
const API_KEY = process.env.USDA_API_KEY;

exports.getUSDASnacks = () => {
    return axios(`${endpoint}/foods/list?dataType=Branded&api_key=${API_KEY}`);
}

exports.getUSDASnackById = (food_id) => {
    return axios(`${endpoint}/food/${food_id}?api_key=${API_KEY}`);
}

exports.searchUSDASnack = (q) => {
    return axios(`${endpoint}/foods/search?query=${q}&api_key=${API_KEY}`);
}
