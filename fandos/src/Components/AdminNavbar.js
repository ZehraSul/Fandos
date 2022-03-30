import React from "react";
import Nav from "react-bootstrap/Nav";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

// Navbar for admin users
function AdminNavbar({
  setUserToken,
  isLoggedIn,
  setIsLoggedIn,
  setPrevOrders,
  setCartItems,
  setUserType,
}) {
  const logoutHandler = () => {
    // is called when logout button in clicked
    // Sets user token to empty string
    setUserToken("");
    //removed token from local storage
    localStorage.removeItem("token");
    //updates various state
    setIsLoggedIn(false);
    setCartItems([]);
    setPrevOrders([]);
    setUserType("");
  };

  return (
    <div>
      {/* If the admin user is logged in display the admin navbar is the user is not logged in display home page */}
      {isLoggedIn === true ? (
        <Nav className="navbar-custom">
          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard">
              Fandos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="dashboard">
              Dashboard
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

export default AdminNavbar;
