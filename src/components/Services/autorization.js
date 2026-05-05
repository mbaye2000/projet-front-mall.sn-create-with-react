import axios from "axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (token, user = null) => {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const userString = localStorage.getItem(USER_KEY);
  return userString ? JSON.parse(userString) : null;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete axios.defaults.headers.common.Authorization;
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
