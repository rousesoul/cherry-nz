import { NavLink } from "react-router-dom";
import React from 'react'
import AuthService from "./services/auth.service";

export default function NavBar() {
    const currentUser = AuthService.getCurrentUser()

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <nav className="navbar navbar-expand navbar-dark watermelon">
            <div className="navbar-brand mx-4">
                <strong>Cherry NZ</strong>
            </div>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink exact to={"/prodouct"} className="nav-link">
                        Prodouct
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to={"/oderList"} className="nav-link">
                        OderList
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to={"/userlist"} className="nav-link">
                        UserList
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to={"/fileupload"} className="nav-link">
                        File Upload
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to={"/weatherforecast"} className="nav-link">
                        Weather Forecast
                    </NavLink>
                </li>
            </div>

            {currentUser &&
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink exact to={"/profile"} className="nav-link">
                            {currentUser.userName}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link me-4" onClick={logOut}>
                            LogOut
                        </a>
                    </li>
                </div>
            }
        </nav>
    )
}