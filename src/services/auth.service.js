import axios from "axios";

const API_URL = "http://206.189.39.185:5031/api/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "UserRegister", {
    username,
    email,
    password,
  });
};

const login = (username, password, rememberme) => {
  return axios
    .post(API_URL + "UserLogin", {
      username,
      password,
    })
    .then((response) => {
      setExpiry(rememberme)
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    });
};

const logout = () => {
  getExpiry("key")
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setExpiry = (rememberme) => {
  const now = new Date()
  const item = {
    rememberme: rememberme,
    expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000,
  }
  localStorage.setItem("key", JSON.stringify(item));
}

const getExpiry = (key) => {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
    localStorage.removeItem("user");
		return null
	}
	return item.rememberme
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
  getExpiry,
};