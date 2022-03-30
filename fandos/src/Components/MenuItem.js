import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/MenuItem.css";
import { FANDOS_API_URL } from "../config/config";

// Single menu item for the basic user
function MenuItem({ id, name, price, image, description, setCartItems }) {
  const AddToCartHandler = (e) => {
    e.preventDefault();

    // Get user token
    let token = localStorage.getItem("token");
    // if user is logged in, add item to their cart
    if (token) {
      fetch(`${FANDOS_API_URL}/cart/add`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          item: {
            _id: id,
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
  return (
    // Card displaying menu item with add to cart button
    <div style={{ padding: "50px", marginRight: "auto" }}>
      <Card>
        <img
          className="MenuItem__Image"
          variant="top"
          src={`/images/${image}.jpg`}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button type="submit" variant="danger" onClick={AddToCartHandler}>
                Add to cart
              </Button>
            </Col>
            <Col>
              <Card.Text id="MenuItemPrice">R{price}</Card.Text>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default MenuItem;
