import React from "react";
import MenuItem from "./MenuItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Displaying menu with items
function Menu({ displayMenu, setCartItems }) {
  return (
    <Row>
      {displayMenu.map((item) => {
        return (
          <Col className="col-auto" key={item._id}>
            <MenuItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.imageName}
              description={item.description}
              setCartItems={setCartItems}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Menu;
