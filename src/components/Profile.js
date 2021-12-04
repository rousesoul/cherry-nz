import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      {currentUser ?
        <div className="container">
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
        <div className="container text-center mt-5">
          <h3>Sorry! You aren't our user so can't read this page. Please sign up first.</h3>
        </div>
      }
    </>
  );
};

export default Profile;