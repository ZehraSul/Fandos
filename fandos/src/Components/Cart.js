import React from "react";
import { useState, useEffect } from "react";
import { FANDOS_API_URL } from "../config/config";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// All basic user have a cart

function Cart({
  userToken,
  setUserToken,
  cartItems,
  setCartItems,
  prevOrders,
  setPrevOrders,
}) {
  // Setting intial state
  const [totalPrice, setTotalPrice] = useState(0.0);
  // Calculating total price of the items in the cart
  const calculateTotalPrice = (items) => {
    let sum = 0;
    items.forEach((i) => (sum += i.price));
    return sum;
  };

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
            // Update state of cart items and total price
            setCartItems(data.items);
            setTotalPrice(calculateTotalPrice(data.items));
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userToken]);

  // remove a single item from the cart
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
        // uses the id of the cart item to remove it
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
            // update state
            setCartItems(data.items);
            setTotalPrice(calculateTotalPrice(data.items));
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  // Calls clearcart function
  const ClearCartHandler = (e) => {
    e.preventDefault();
    clearCart();
  };

  // Placing the order, call the create order API
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
            // add the order to the list of previous orders so it can be displayed on the order history page
            setPrevOrders([...prevOrders, data]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };
  // Makes API call to remove all the items in the cart.
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
            // Updating state of items and total price
            setCartItems(data.items);
            setTotalPrice(calculateTotalPrice(data.items));
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  return (
    <div
      style={{
        paddingTop: "50px",
        textAlign: "center",
      }}
    >
      <h1>Cart</h1>
      <div
        style={{
          width: "50%",
          margin: "auto",
          border: "black 1px solid",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        {cartItems.map((cartItem) => {
          return (
            <Row
              style={{
                padding: "16px",
                textAlign: "Left",
              }}
            >
              <Col xs={1}>
                <Button
                  type="submit"
                  variant="danger"
                  onClick={RemoveFromCartHandler}
                  cartitemid={cartItem._id}
                >
                  X
                </Button>
              </Col>
              <Col>{cartItem.name}</Col>
              <Col>R{cartItem.price}</Col>
            </Row>
          );
        })}
        <Row>
          <Col style={{ textAlign: "center", fontSize: "150%" }} xs={6}>
            Total:
          </Col>
          <Col style={{ textAlign: "center", fontSize: "150%" }} xs={2}>
            R{totalPrice.toFixed(2)}
          </Col>
        </Row>
        <div
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button type="submit" variant="warning" onClick={ClearCartHandler}>
            Clear Cart
          </Button>
          <Button type="submit" variant="success" onClick={PlaceOrderHandler}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
