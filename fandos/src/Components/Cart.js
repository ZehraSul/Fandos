import React from "react";
import { useState, useEffect } from "react";
import { FANDOS_API_URL } from "../config/config";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cart({
  userToken,
  setUserToken,
  cartItems,
  setCartItems,
  prevOrders,
  setPrevOrders,
}) {
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
            setCartItems(data.items);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userToken]);

  const RemoveFromCartHandler = (e) => {
    e.preventDefault();
    // if user is logged in, remove item from their cart
    if (userToken) {
      fetch(`${FANDOS_API_URL}/cart/remove`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({
          item: {
            _id: e.target.attributes["cartitemid"].value,
          },
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            setCartItems(data.items);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  const ClearCartHandler = (e) => {
    e.preventDefault();
    clearCart();
  };

  const PlaceOrderHandler = (e) => {
    e.preventDefault();
    // if user is logged in, place order and clear cart
    if (userToken) {
      fetch(`${FANDOS_API_URL}/orders/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({
          orderNumber: new Date().valueOf(),
          items: cartItems,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            clearCart();
            setPrevOrders([...prevOrders, data]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  const clearCart = () => {
    if (userToken) {
      fetch(`${FANDOS_API_URL}/cart/clear`, {
        method: "DELETE",
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
            setCartItems(data.items);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((cartItem) => {
        return (
          <Row>
            <Col>{cartItem.name}</Col>
            <Col>R{cartItem.price}</Col>
            <Col>
              <Button
                type="submit"
                variant="danger"
                onClick={RemoveFromCartHandler}
                cartitemid={cartItem._id}
              >
                -
              </Button>
            </Col>
          </Row>
        );
      })}
      <Button type="submit" variant="warning" onClick={ClearCartHandler}>
        Clear Cart
      </Button>
      <Button type="submit" variant="success" onClick={PlaceOrderHandler}>
        Place Order
      </Button>
    </div>
  );
}

export default Cart;
