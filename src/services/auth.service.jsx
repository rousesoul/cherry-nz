import axios from "axios";

const API_URL = "http://206.189.39.185:5031/api/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "UserRegister", {
    username,
    email,
    password,
  });
};

const login = (username, password, rememberMe) => {
  return axios
    .post(API_URL + "UserLogin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        if (rememberMe) {
          setExpiry(rememberMe);
          localStorage.setItem("user", JSON.stringify(response.data.data))
        } else {
          sessionStorage.setItem("user", JSON.stringify(response.data.data))
        }
      }
      return response.data.data;
    });
};

const logout = () => {
  sessionStorage.removeItem("user")
  localStorage.removeItem("user")
  localStorage.removeItem("key")
};

const getCurrentUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"))
  }
  if (sessionStorage.getItem("user")) {
    return JSON.parse(sessionStorage.getItem("user"))
  }
};

const setExpiry = (rememberMe) => {
  const now = new Date()
  const item = {
    rememberMe: rememberMe,
    expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000,
  }
  localStorage.setItem("key", JSON.stringify(item));
}

const getExpiry = () => {
  const itemStr = localStorage.getItem("key")
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("key")
    localStorage.removeItem("user")
    return null
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
  getExpiry,
};