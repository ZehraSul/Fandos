import React from "react";
import MenuItem from "./MenuItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MenuImages from "./MenuImages";

function Menu({ displayMenu }) {
  return (
    <Row>
      {displayMenu.map((item) => {
        return (
          <Col className="col-auto">
            <MenuItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.imageName}
              description={item.description}
              menuImages={MenuImages}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Menu;
