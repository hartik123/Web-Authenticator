
const loginURL = 'http://localhost:8000/auth/login';
import {apiFetch} from './apiFetch.js';

export const loginAPI = ({ email, password }) => {
    return apiFetch(loginURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res=>res.json());
}