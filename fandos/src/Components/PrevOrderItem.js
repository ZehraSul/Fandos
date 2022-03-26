import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PrevOrderItem({ orderNumber, items, date }) {
  return (
    <div>
      <Row>
        <Col>{orderNumber}</Col>
        {/* ZEHRA listing multiple items from an array*/}
        <Col>
          {items.map((item) => {
            return `${item.name} `;
          })}
        </Col>
        ;<Col>{date}</Col>
        <Col>
          <Button>Again please!</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PrevOrderItem;
