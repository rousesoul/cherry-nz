import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import Prodouct from './Prodouct';
import UserList from './UserList';
import Home from "./Home";
import OderList from "./OderList";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Cherry NZ
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/prodouct"} className="nav-link">
              Prodouct
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/userlist"} className="nav-link">
              UserList
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/oderList"} className="nav-link">
              OderList
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.userName}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container-fluid mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/prodouct" component={Prodouct} />
          <Route exact path="/userlist" component={UserList} />
          <Route exact path="/oderList" component={OderList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;