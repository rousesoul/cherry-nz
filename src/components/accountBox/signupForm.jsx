import React, { useState, useRef, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./accountContext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";
import { Marginer } from "../marginer/marginer";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function SignupForm() {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        () => {
          setMessage("Signuped successfully! You can login now!");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <Form onSubmit={handleRegister} ref={form}>
        {!successful &&
          <>
            <div className="form-container">
              <Input
                type="text"
                placeholder="Username"
                className="form-control input"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]} />
              <Input
                type="text"
                placeholder="Email"
                className="form-control input"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]} />
              <Input
                type="password"
                placeholder="Password"
                className="form-control input"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]} />
            </div><Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit">Signup</SubmitButton>
          </>
        }
        {message &&
          <div className="form-group">
            <div
              className={successful ? "alert alert-success" : "alert alert-danger"}
              role="alert"
            >
              {message}
            </div>
          </div>
        }
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>
          Already have an account?
          <BoldLink href="#" onClick={switchToSignin}>
            Login
          </BoldLink>
        </MutedLink>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </BoxContainer>
  );
}