import axios from 'axios';

export function fetchSnacksList(callback) {
    let result = [];

    if (!callback) return;

    axios.get('http://localhost:4000/snacks')
         .then(response => {
             result = response.data;
             callback(result);
         })
         .catch(function (error) {
             console.log(error);
         });
}

export function fetchSnacksByName(keyword, callback) {
    let result = [];

    if (!callback) return;

    axios.get('http://localhost:4000/snacks', {
        params: {
            q: keyword
        }
    }).then((response) => {
        result = response.data;
        callback(result);
    });
}

export function fetchSnackByID(snack_id, callback) {
    let result = null;

    if (!callback) return;

    axios.get(`http://localhost:4000/snacks/${snack_id}`)
        .then((response) => {
            result = response.data;
            callback(result);
        });

}
