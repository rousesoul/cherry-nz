import { NavLink } from "react-router-dom";
import React from 'react'
import authService from "./services/auth.service";

export default function NavBar({ currentUser }) {
    const logOut = () => {
        authService.logout();
    };

    return (
        <nav className="navbar navbar-expand navbar-dark watermelon">
            <div className="navbar-brand mx-4">
                <strong>Cherry NZ</strong>
            </div>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink exact to="/product" className="nav-link">
                        Product
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/oderList" className="nav-link">
                        OderList
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/userlist" className="nav-link">
                        UserList
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink exact to="/weatherforecast" className="nav-link">
                        Weather Forecast
                    </NavLink>
                </li>
            </div>

            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink exact to="/profile" className="nav-link">
                        {currentUser.userName}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a href="/home" className="nav-link me-4" onClick={logOut}>
                        LogOut
                    </a>
                </li>
            </div>
        </nav>
    )
}