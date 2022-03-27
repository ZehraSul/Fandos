import React from "react";
import Nav from "react-bootstrap/Nav";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({
  setUserToken,
  isLoggedIn,
  setIsLoggedIn,
  setPrevOrders,
  setCartItems,
}) {
  const logoutHandler = (e) => {
    setUserToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCartItems([]);
    setPrevOrders([]);
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <Nav className="navbar-custom">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Fandos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="menu">
              Menu
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="orderhistory">
              Order History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="cart">
              Cart
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="logout" onClick={logoutHandler}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className="navbar-custom">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Fandos
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </div>
  );
}

export default Navbar;
