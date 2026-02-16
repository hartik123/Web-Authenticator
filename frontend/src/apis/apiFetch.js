import { getAccessToken } from "../auth/tokenService";
import { refreshAccessToken } from "../auth/refreshToken";

let isRefreshing = false;
let refreshPromise = null;

export async function apiFetch(url, options = {}) {

  const token = getAccessToken();

  const response = await fetch(`${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    credentials: "include"
  });

  // if token expired
  if (response.status !== 401) {
    return response;
  }

  // prevent 10 requests refreshing simultaneously
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshAccessToken();
  }

  const newToken = await refreshPromise;
  isRefreshing = false;

  if (!newToken) return response;

  // retry original request
  return fetch(`${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${newToken}`
    },
    credentials: "include"
  });
}