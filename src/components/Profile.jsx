import React from "react";
import { withRouter, Redirect } from 'react-router-dom';
import authService from "../services/auth.service";

function Profile() {
  const currentUser = authService.getCurrentUser()

  return (
    currentUser
      ?
      <div className="container mt-3">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.userName}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>User Id:</strong> {currentUser.userId}
        </p>
        <p>
          <strong>Type:</strong> {currentUser.type}
        </p>
        <p>
          <strong>Discount Rate:</strong> {currentUser.discountRate}
        </p>
        <p>
          <strong>Token:</strong> {currentUser.token}
        </p>
      </div>
      :
      <Redirect to="/home" />
  );
}

export default withRouter(Profile)