import axios from "axios";

const API_URL = "http://206.189.39.185:5031/api/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "UserRegister", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "UserLogin", {
      username,
      password,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
};