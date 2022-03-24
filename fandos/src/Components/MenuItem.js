import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MenuItem({ id, name, price, image, description, menuImages }) {
  const AddToCartHandler = (e) => {
    console.log(e.target.attributes[1]);
  };

  return (
    <div style={{ padding: "50px", marginRight: "auto" }}>
      <Card style={{ width: "300px" }}>
        <img variant="top" src={menuImages[image]} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{id}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button
                type="submit"
                // ZEHRA
                item={name}
                price={price}
                style={{ borderRadius: "50px" }}
                variant="danger"
                onClick={AddToCartHandler}
              >
                +
              </Button>
            </Col>
            <Col>
              <Card.Text style={{ color: "blue" }}>R{price}</Card.Text>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default MenuItem;
