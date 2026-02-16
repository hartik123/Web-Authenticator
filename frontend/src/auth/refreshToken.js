import { setAccessToken, clearAccessToken, getRefreshToken, clearRefreshToken } from "./tokenService";

export async function refreshAccessToken() {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        const res = await fetch("http://localhost:8000/auth/refresh", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
        });
        if (!res.ok) throw new Error("Refresh Failed");

        const data = await res.json();

        setAccessToken(data.token);
        return data.token;
    }
    catch (error) {
        console.error("Token refresh failed:", error);
        clearAccessToken();
        clearRefreshToken();
        window.location.href = "/login";
        return null;
    }
}