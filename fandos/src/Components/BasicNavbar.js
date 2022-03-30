import React from "react";
import Nav from "react-bootstrap/Nav";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

// Navbar for basic users, which is everyone who registers via email/facebook/google
function BasicNavbar({
  setUserToken,
  isLoggedIn,
  setIsLoggedIn,
  setPrevOrders,
  setCartItems,
  setUserType,
}) {
  // handles logging out when the logout button in clicked
  const logoutHandler = (e) => {
    setUserToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCartItems([]);
    setPrevOrders([]);
    setUserType("");
  };

  return (
    <div>
      {/* If the user is logged in display the basic user navbar is the user is not logged in display home page */}
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

export default BasicNavbar;
