import axios from "axios";

/* axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true; */

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});


client.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403) {
            // Redirect to the login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default client;
