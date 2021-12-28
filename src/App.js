import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import OrderList from "./OrderList";
import AuthService from "./services/auth.service";
import UserList from "./UserList";
import WeatherForecast from "./WeatherForecast";
import ProtectedRoute from "./ProtectedRoute";
import Product from "./Product";
import { useEffect } from "react";
import Forbidden from "./components/Forbidden";

export default function App() {
  let location = useLocation();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    AuthService.getCurrentUser();
    AuthService.getExpiry();
  }, [location.pathanme]);

  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/forbidden" component={Forbidden} />
      <Route exact path="/" render={() => currentUser ? <Redirect to="/product" /> : <Redirect to="/home" />} />
      <ProtectedRoute path="/product" component={Product} currentUser={currentUser} />
      <ProtectedRoute path="/oderList" component={OrderList} currentUser={currentUser} />
      <ProtectedRoute path="/userlist" component={UserList} currentUser={currentUser} />
      <ProtectedRoute path="/weatherforecast" component={WeatherForecast} currentUser={currentUser} />
      <ProtectedRoute path="/profile" component={Profile} currentUser={currentUser} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}