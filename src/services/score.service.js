import axios from 'axios';

export function postSnackScore(snack_id,score) {

    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/score/consume`, {
        params: {
            snack_id: snack_id,
            score: score,
        }
    });
}

export function fetSnackScore() {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/graph`);
}

export function fetUserData(){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/userdata`);
}

// Dummy route
export function fetAllData(){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/alldata`);
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
