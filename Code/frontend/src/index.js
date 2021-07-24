import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios';
import { getToken } from './utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

axios.interceptors.request.use(async config => {
    config.headers['access-token'] = await getToken()
    return config
}, (error) => {
    return Promise.reject(error)
})

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
