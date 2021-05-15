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

export function fetchSnacksByName(input, callback) {
    let result = [];

    if (!callback) return;

    axios.post('http://localhost:4000/id', {
        searchWord: input,
    }).then((response) => {
        result = response.data;
        callback(result);
    });
}

export function fetchSnackByID(input, callback) {
    let result = [];

    if (!callback) return;

    axios.post('http://localhost:4000/score', {
        searchID: input,
    }).then((response) => {
        result = response.data;
        callback(result);
    });
}
