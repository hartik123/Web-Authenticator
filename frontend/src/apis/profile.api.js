import { apiFetch } from "./apiFetch";

const meURL = 'http://localhost:8000/user/me';

export const fetchProfile = () => {
    return apiFetch(meURL, {
        method: "GET"
    })
    .then(res => res.json());
}