import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MenuItem({ name, price, image, description }) {
  const AddToCartHandler = (e) => {
    console.log(e);
  };
  return (
    <div style={{ padding: "50px", marginRight: "auto" }}>
      <Card style={{ width: "300px" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button
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
