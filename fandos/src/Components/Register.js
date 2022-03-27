import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "../css/Register.css";
import { FANDOS_API_URL } from "../config/config";
import { Link, useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn, setUserToken, navigate, setCartItems }) {
  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const emailAddressChangedHandler = (e) => setEmailAddress(e.target.value);
  const passwordChangedHandler = (e) => setPassword(e.target.value);
  const confirmPasswordChangedHandler = (e) =>
    setConfirmPassword(e.target.value);

  const registerHandler = (e) => {
    e.preventDefault();
    if (emailAddress && password && confirmPassword) {
      if (password === confirmPassword) {
        fetch(`${FANDOS_API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: emailAddress,
            password: password,
            confirmPassword: confirmPassword,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
              // if the user was created successfully, update state and store the token in local storage
              setUserToken(res.token);
              localStorage.setItem("token", res.token);
              setIsLoggedIn(true);
              createCart(res.token);
            } else {
              // if either the username o password are incorrect show can error
              alert("Registration Failed!");
              console.log(res);
            }
          })
          // Error handling
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Required fields are not populated!");
    }
  };

  const createCart = (token) => {
    if (token) {
      console.log(token);
      fetch(`${FANDOS_API_URL}/cart/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          items: [],
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (_) => {
            setCartItems([]);
            navigate("/menu");
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  return (
    <div className="register-form">
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={confirmPasswordChangedHandler}
          />
        </Form.Group>
        <Button variant="danger" type="submit" onClick={registerHandler}>
          Register
        </Button>
      </Form>
      <div className="py-5">
        <h2>Been here before ...</h2>
        <Button variant="outline-danger" as={Link} to="/login">
          Login?
        </Button>
      </div>
    </div>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Register {...props} navigate={navigate} />;
}

export default WithNavigate;
