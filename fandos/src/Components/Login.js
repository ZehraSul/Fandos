import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/Login.css";
import { FANDOS_API_URL } from "../config/config";

function Login({ setIsLoggedIn, setShowRegisterPage, setUserToken }) {
  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");

  const emailAddressChangedHandler = (e) => setEmailAddress(e.target.value);
  const passwordChangedHandler = (e) => setPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();

    if (emailAddress && password) {
      if (emailAddress && password) {
        fetch(`${FANDOS_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: emailAddress,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
              // if the user exists and the password is correct, update state and store the token in local storage
              setUserToken(res.token);
              localStorage.setItem("token", res.token);
              setIsLoggedIn(true);
            } else {
              // if either the username o password are incorrect show can error
              alert("Login Failed!");
              console.log(res);
            }
          })
          // Error handling
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Required fields are not populated!");
    }
  };

  const onSignUpButtonHandler = (e) => {
    e.preventDefault();
    setShowRegisterPage(true);
  };

  return (
    <div className="login-form">
      <Form className="border border-danger rounded px-5 py-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailAddressChangedHandler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordChangedHandler}
          />
        </Form.Group>
        <Button variant="danger" onClick={loginHandler}>
          Submit
        </Button>
      </Form>
      <div className="py-5">
        <h2>New around here? </h2>
        <Button variant="outline-danger" onClick={onSignUpButtonHandler}>
          Sign Up?
        </Button>
      </div>
    </div>
  );
}

export default Login;
