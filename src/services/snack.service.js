import axios from 'axios';

export function fetchSnacksListUSDA() {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/usda/snacks`);
}

export function fetchSnacksByNameUSDA(keyword) {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/usda/search`, {
        params: {
            q: keyword
        }
    });
}

export function fetchSnackByIDUSDA(snack_id) {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/usda/snacks/${snack_id}`);
}

export function fetchCSVFiles(file_path) {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/usda/files`, {
        params: {
            f: file_path
        }
    });
}
