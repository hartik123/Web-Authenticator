import { setAccessToken, clearAccessToken } from "./tokenService";

export async function refreshAccessToken() {
    try {
        const res = await fetch("http://localhost:8000/auth/refresh", {
            method: 'POST',
            credentials: "include"
        });
        if(!res.ok) throw new Error("Refresh Failed");

        const data = await res.json();

        setAccessToken(data.token);
        return data.token;
    }
    catch (error) {
        console.error();
        window.location.href="/login";
        return null;

    }
}