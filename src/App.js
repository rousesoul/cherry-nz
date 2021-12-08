import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import FileUpload from "./components/FileUpload";
import Home from "./components/Home";
import Profile from "./components/Profile";
import OderList from "./OderList";
import Prodouct from "./Prodouct";
import AuthService from "./services/auth.service";
import UserList from "./UserList";
import WeatherForecast from "./WeatherForecast";


export default function App() {
  const currentUser = AuthService.getCurrentUser()
  AuthService.getExpiry()

  return (
    <Switch>
      <Route exact path="/" render={() => currentUser ? <Redirect to="/profile" /> : <Redirect to="/home" />} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/prodouct" component={Prodouct} />
      <Route path="/oderList" component={OderList} />
      <Route path="/userlist" component={UserList} />
      <Route path="/fileupload" component={FileUpload} />
      <Route path="/weatherforecast" component={WeatherForecast} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}