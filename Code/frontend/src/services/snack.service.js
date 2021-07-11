import axios from 'axios';

export function fetchSnacksListUSDA() {
    return axios.get('http://localhost:4000/usda/snacks');
}

export function fetchSnacksByNameUSDA(keyword) {
    return axios.get('http://localhost:4000/usda/search', {
        params: {
            q: keyword
        }
    });
}

export function fetchSnackByIDUSDA(snack_id) {
    return axios.get(`http://localhost:4000/usda/snacks/${snack_id}`);
}

export function fetchCSVFiles(file_path) {
    return axios.get(`http://localhost:4000/usda/files`, {
        params: {
            f: file_path
        }
    });
}
