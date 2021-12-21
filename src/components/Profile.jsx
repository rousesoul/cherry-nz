import React from "react";
import { withRouter } from 'react-router-dom';

function Profile({ currentUser }) {
  return (
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
  );
}

export default withRouter(Profile)