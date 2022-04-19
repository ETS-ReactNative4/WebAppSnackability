import axios from 'axios';

export function postSnackScore(snack_id, score, desc, brandName, portion, unit) {

    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/score/consume`, {
        params: {
            snack_id: snack_id,
            score: score,
            desc: desc,
            brandName: brandName,
            portion: portion,
            unit: unit
        }
    });
}

export function fetSnackScore() {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/graph`);
}

export function fetUserData(){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/userdata`);
}

export function fetCSVGen(){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/csvgen`);
}

export function calculateSnackScore(snack_id, portion, unit) {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/calculate`, {
        params: {
            snack_id: snack_id,
            portion: portion,
            unit: unit
        }
    });
}
