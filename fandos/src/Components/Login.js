import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FANDOS_API_URL } from "../config/config";

// Login with email
function Login({ setIsLoggedIn, setUserToken, navigate, setUserType }) {
  // Setting initial state
  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");

  // updating state
  const emailAddressChangedHandler = (e) => setEmailAddress(e.target.value);
  const passwordChangedHandler = (e) => setPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();

    if (emailAddress && password) {
      if (emailAddress && password) {
        // Making API call with email address and password
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
              setUserType(res.userType);
              localStorage.setItem("token", res.token);
              localStorage.setItem("userType", res.userType);
              setIsLoggedIn(true);
              if (res.userType === "admin") {
                navigate("/dashboard");
              } else {
                navigate("/menu");
              }
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

  return (
    // This is a form with fields for email address and password. has button for logging in with email or with facebook and google
    <div className="login-form">
      <Form className="border border-danger bg-white rounded px-5 py-5">
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
        <Row>
          <Col>
            <Button variant="danger" onClick={loginHandler}>
              Login
            </Button>
          </Col>
          <Col>
            {/*Google button */}
            <GoogleLoginButton
              setUserToken={setUserToken}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Col>
          <Col>
            {/*Facebook button */}
            <FacebookLoginButton
              setUserToken={setUserToken}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Col>
        </Row>
      </Form>
      <div className="py-5">
        <h2>New around here? </h2>
        <Button as={Link} variant="danger" to="/register">
          Sign Up?
        </Button>
      </div>
    </div>
  );
}
// work around for allowing component to use navigation for routes
function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
