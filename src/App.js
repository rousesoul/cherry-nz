import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import OderList from "./OderList";
import AuthService from "./services/auth.service";
import UserList from "./UserList";
import WeatherForecast from "./WeatherForecast";
import NavBar from "./NavBar";
import ProtectedRoute from "./ProtectedRoute";
import Product from "./Product";

export default function App() {
  let pathname = window.location.pathname
  const currentUser = AuthService.getCurrentUser()
  AuthService.getExpiry()

  return (
    <>
      {pathname === "/home" || (!currentUser && pathname === "/") ? null : <NavBar currentUser={currentUser} />}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" render={() => currentUser ? <Redirect to="/product" /> : <Redirect to="/home" />} />
        <Route exact path="/product" component={Product} />
        <ProtectedRoute path="/oderList" component={OderList} currentUser={currentUser} />
        <ProtectedRoute path="/userlist" component={UserList} currentUser={currentUser} />
        <ProtectedRoute path="/weatherforecast" component={WeatherForecast} currentUser={currentUser} />
        <ProtectedRoute path="/profile" component={Profile} currentUser={currentUser} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}