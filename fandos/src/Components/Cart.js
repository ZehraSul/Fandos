import React from "react";
import { useState, useEffect } from "react";
import { FANDOS_API_URL } from "../config/config";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cart({ userToken, setUserToken }) {
  let [displayCart, setDisplayCart] = useState([]);
  /* Using useEffect to make the initial call to my api to display menu*/
  useEffect(() => {
    // if user is already logged in, get the token and set it as userToken
    let token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
    // if user is logged in display all their tasks
    if (userToken) {
      fetch(`${FANDOS_API_URL}/cart/displayAll`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + userToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            // console.log(data);
            setDisplayCart([data]);
            // console.log([data]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userToken]);
  return (
    <div>
      <h1>Cart</h1>
      {displayCart.map((item) => {
        return (
          <Row>
            <Col>{item.items[0].name}</Col>
            <Col>R{item.items[0].price}</Col>
          </Row>
        );
      })}
    </div>
  );
}

export default Cart;
