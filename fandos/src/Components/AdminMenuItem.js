import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteMenuItem from "./DeleteMenuItem";
import "../css/MenuItem.css";

// This is the singular item that will be shown to an admin user
function AdminMenuItem({
  displayMenu,
  setDisplayMenu,
  id,
  name,
  price,
  image,
  description,
}) {
  return (
    /* Displays relevant information and a delete button for the admin user to delete the menu item */
    <div style={{ padding: "25px", marginRight: "auto" }}>
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
              {/* Uses imported DeleteMenuItem component */}
              <DeleteMenuItem
                id={id}
                displayMenu={displayMenu}
                setDisplayMenu={setDisplayMenu}
              />
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

export default AdminMenuItem;
