import axios from 'axios';

export function fetchSnacksList() {
	return axios.get('http://localhost:4000/snacks');
}

export function fetchSnacksByName(keyword) {
	return axios.get('http://localhost:4000/snacks', {
		params: {
			q: keyword,
		},
	});
}

export function fetchSnackByID(snack_id) {
	return axios.get(`http://localhost:4000/snacks/${snack_id}`);
}

export function fetchSnacksListUSDA() {
	return axios.get('http://localhost:4000/usda/snacks');
}

export function fetchSnacksByNameUSDA(keyword) {
	return axios.get('http://localhost:4000/usda/search', {
		params: {
			q: keyword,
		},
	});
}

export function fetchSnackByIDUSDA(snack_id) {
	return axios.get(`http://localhost:4000/usda/snacks/${snack_id}`);
}

export function fetchSnackScore(snack_id, serving, unit) {
	return axios.get(`http://localhost:4000/usda/${snack_id}/score`, {
		params: {
			serving: serving,
			unit: unit,
		},
	});
}
