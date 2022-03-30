import React from "react";
import AdminMenuItem from "./AdminMenuItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// This is the menu page for Admin users only. Admin users cannot registered and must be specifically created.

function AdminMenu({ displayMenu, setDisplayMenu }) {
  return (
    <Row>
      {/* Displays a list of menu items */}
      {displayMenu.map((item) => {
        return (
          <Col className="col-auto">
            <AdminMenuItem
              displayMenu={displayMenu}
              setDisplayMenu={setDisplayMenu}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.imageName}
              description={item.description}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default AdminMenu;
