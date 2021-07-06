import axios from 'axios';

export function postSnackScore(snack_id,score) {               

    return axios.post('http://localhost:4000/score/consume', {
        params: {
            snack_id: snack_id,
            score: score,            
        }
    });
}