import api from "./api";
import { create } from "./http";

const register = (username, email, password) => {
  return create(api.apiURL + api.signup, {
    username,
    email,
    password,
  })
}

const login = (username, password, rememberMe) => {
  return create(api.apiURL + api.login, {
    username,
    password,
  })
    .then((response) => {
      console.log(username)
      if (response.data.data.token) {
        if (rememberMe) {
          setExpiry(rememberMe);
          localStorage.setItem("user", JSON.stringify(response.data.data));
        } else {
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
        }
      }
      return response.data.data;
    })
}

const logout = () => {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  localStorage.removeItem("key");
}

const getCurrentUser = () => JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

const setExpiry = (rememberMe) => {
  const now = new Date()
  const item = {
    rememberMe: rememberMe,
    expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000,
  }
  localStorage.setItem("key", JSON.stringify(item));
}

const getExpiry = () => {
  const itemStr = localStorage.getItem("key");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("key");
    localStorage.removeItem("user");
    return null;
  }
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getExpiry,
}

export default AuthService