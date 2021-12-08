import axios from "axios";

export default axios.create({
  baseURL: "http://206.189.39.185:5031/api/Common",
  headers: {
    "Content-type": "application/json"
  }
});