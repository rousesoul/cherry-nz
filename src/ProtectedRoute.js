import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ currentUser, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                currentUser
                    ?
                    <Component currentUser={currentUser}/>
                    :
                    <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
            }
        />
    )
}