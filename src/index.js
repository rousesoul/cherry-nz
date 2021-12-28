import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { fetch, create, remove, update } from "./services/http";
import api from "./services/api";

Component.prototype.get = fetch;
Component.prototype.post = create;
Component.prototype.put = update;
Component.prototype.delete = remove;
Component.prototype.api = api;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);