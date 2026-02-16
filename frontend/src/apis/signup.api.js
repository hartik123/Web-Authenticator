
const signUpURL = 'http://localhost:8000/auth/signup';

export const signUpAPI = ({name, email, password})=>{
    return fetch(signUpURL, {
        method: 'POST', 
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({name, email, password})
    }).then(res => res.json());
}