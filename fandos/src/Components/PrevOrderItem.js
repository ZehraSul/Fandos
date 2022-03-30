import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Single order displayed in a card with relevant information
function PrevOrderItem({ orderNumber, items, date }) {
  return (
    <div style={{ padding: "50px", marginRight: "auto" }}>
      <Card>
        <Card.Header style={{ fontWeight: "bold" }}>
          Order Number: {orderNumber}
        </Card.Header>
        <ListGroup variant="flush">
          {items.map((item) => {
            return <ListGroup.Item>{item.name}</ListGroup.Item>;
          })}
        </ListGroup>
        <Card.Footer style={{ fontWeight: "bold" }}>Date: {date}</Card.Footer>
      </Card>
    </div>
  );
}

export default PrevOrderItem;
