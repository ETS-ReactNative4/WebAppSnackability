import axios from 'axios';

export function fetchSnacksList() {
    return axios.get('http://localhost:4000/snacks');
}

export function fetchSnacksByName(keyword) {
    return axios.get('http://localhost:4000/snacks', {
        params: {
            q: keyword
        }
    });
}

export function fetchSnackByID(snack_id) {
    return axios.get(`http://localhost:4000/snacks/${snack_id}`);
}
