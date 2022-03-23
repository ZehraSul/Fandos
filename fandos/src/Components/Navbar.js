import React from "react";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import "../css/Navbar.css";
import Modal from "react-bootstrap/Modal";
import OrderHistory from "./OrderHistory";
import Button from "react-bootstrap/Button";

function Navbar({ setUserToken, isLoggedIn, setIsLoggedIn }) {
  const [showModal, setShowModal] = useState(false);

  const logoutHandler = (e) => {
    setUserToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // setTasks([]);
    // setUserName("");
    // setPassword("");
    // setInputText("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div>
      {isLoggedIn === true ? (
        <Nav className="navbar-custom">
          <Nav.Item>
            <Nav.Link eventKey="home" href="/home">
              Fandos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              data-toggle="modal"
              data-target="#orderHistory"
              onClick={handleShow}
              eventKey="history"
              href="/history"
            >
              Order History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cart" href="/cart">
              Cart
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="justify-content-end">
            <Nav.Link eventKey="logout" onClick={logoutHandler}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className="navbar-custom">
          <Nav.Item>
            <Nav.Link href="/home">Fandos</Nav.Link>
          </Nav.Item>
        </Nav>
      )}
      <Modal
        id="orderHistory"
        style={{ opacity: "1", padding: "40vh" }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Add a car</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          {/* Cancels the editing by closing the modal */}
          <Button
            variant="secondary"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {/* Calls editHandler to save the new information*/}
          <Button variant="success" onClick={OrderHistory} data-dismiss="modal">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
