import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Prodouct from './Prodouct';
import UserList from './UserList';
import OderList from "./OderList";
import FileUpload from "./components/FileUpload";
import WeatherForecast from "./WeatherForecast";
import Profile from "./components/Profile";
import { NavBar } from "./NavBar";
import Home from "./components/Home";

function App() {
  let pathname = window.location.pathname

  return (
    <div>
      {pathname !== "/" && <NavBar />}
      <div className="container-fluid mt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/prodouct" component={Prodouct} />
          <Route path="/oderList" component={OderList} />
          <Route path="/userlist" component={UserList} />
          <Route path="/fileupload" component={FileUpload} />
          <Route path="/weatherforecast" component={WeatherForecast} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;