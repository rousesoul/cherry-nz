import React from 'react';
import { Route } from "react-router-dom";
import Forbidden from './components/Forbidden';
import NavBar from "./NavBar";

export default function ProtectedRoute({ currentUser, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                currentUser
                    ? <>
                        <NavBar currentUser={currentUser} />
                        <Component currentUser={currentUser} />
                    </>
                    : <Forbidden />
            }
        />
    )
}