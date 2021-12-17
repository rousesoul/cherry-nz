import React, { useState, useRef, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function LoginForm() {
  let history = useHistory();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRememberMe = (e) => {
    const rememberMe = e.currentTarget.checked;
    setRememberMe(rememberMe);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password, rememberMe)
        .then(
          () => {
            history.push("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        );
    } else {
      setLoading(false);
    }
  };

  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <Form onSubmit={handleLogin} ref={form}>
        <FormContainer>
          <Input
            type="text"
            placeholder="Username"
            className="form-control input"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
          <Input
            type="password"
            placeholder="Password"
            className="form-control input"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <label>
          <input name="rememberme" checked={rememberMe} value={rememberMe} onChange={onChangeRememberMe} type="checkbox" /> Remember me
        </label>
        <SubmitButton type="submit" disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Login</span>
        </SubmitButton>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Don't have an accoun?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Signup
          </BoldLink>
        </MutedLink>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </BoxContainer>
  );
}