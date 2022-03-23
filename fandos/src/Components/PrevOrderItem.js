import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PrevOrderItem({ name, price }) {
  return (
    <div>
      <Row>
        <Col>{name}</Col>
        <Col>{price}</Col>
        <Col>
          <Button>Again please!</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PrevOrderItem;
