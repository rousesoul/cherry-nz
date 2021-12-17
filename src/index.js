import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { get, post } from "./services/http";
import api from "./services/api";

Component.prototype.get = get;
Component.prototype.post = post;
Component.prototype.api = api;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);