import React from "react";
import NavBar from "../NavBar";
import AuthService from "../services/auth.service";

export default function Profile() {
  const currentUser = AuthService.getCurrentUser()

  return (
    <>
      <NavBar />
      {currentUser ?
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
        <div class="text-center mt-5">
          <h5>Sorry! You are not our user, or your token has expired.</h5>
          <a href="/home" className="text-danger"><h3>Please Login or Signin first!</h3></a>
        </div>
      }
    </>
  );
}