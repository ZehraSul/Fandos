import React from "react";
import MenuItem from "./MenuItem";
import FakeMenu from "./FakeMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Menu() {
  return (
    <div>
      <Row>
        {FakeMenu.map((item) => {
          return (
            <Col className="col-auto">
              <MenuItem
                name={item.name}
                price={item.price}
                image={item.image}
                description={item.description}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Menu;
