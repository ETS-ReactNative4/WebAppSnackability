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

    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/score/graph`, {
    });
}
