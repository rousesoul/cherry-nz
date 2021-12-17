import axios from "axios";

let baseUrl = "http://206.189.39.185:5031"

const instance = axios.create({
  timeout: 10000,
  baseURL: baseUrl
})

instance.defaults.headers.post["Content-Type"] = "application/json"
const getCurrentUser = () => JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

instance.interceptors.request.use(config => {
  config.headers["token"] = getCurrentUser() || ""
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  console.log(response);
  return response;
})

export const get = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "get",
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "post",
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const put = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "put",
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const remove = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "delete",
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}