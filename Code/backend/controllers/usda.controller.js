const { config } = require('../config/config');
const axios = require('axios');

const endpoint = process.env.USDA_API_ENDPOINT;
const API_KEY = process.env.USDA_API_KEY;

exports.getUSDASnacks = (params) => {
    return axios(`${endpoint}/foods/list?dataType=${params.dataType}&api_key=${API_KEY}`);
}

exports.getUSDASnackById = (food_id) => {
    return axios(`${endpoint}/food/${food_id}?api_key=${API_KEY}`);
}

exports.searchUSDASnack = (params) => {
    return axios(`${endpoint}/foods/search?dataType=${params.dataType}&query=${params.q}&api_key=${API_KEY}`);
}
