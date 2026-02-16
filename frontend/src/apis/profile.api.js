import { apiFetch } from "./apiFetch";

const meURL = 'http://localhost:8000/user/me';

export const fetchProfile = (token)=>{
    return apiFetch(`${meURL}`, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>res.json());
}