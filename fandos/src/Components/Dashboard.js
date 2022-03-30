import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FANDOS_API_URL } from "../config/config";
import Images from "./Images";
import AdminMenu from "./AdminMenu";

// Admin users only dashboard
function Dashboard({ displayMenu, setDisplayMenu }) {
  // Setting intital state
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [imageName, setImageName] = useState("full-chicken");
  const [description, setDescription] = useState("");

  // Set initial state for modal
  const [showModal, setShowModal] = useState(false);

  // handles closing the modal when either the "cancel" button or the "add" button is clicked
  const handleClose = () => {
    setShowModal(false);
  };

  // handles displaying the modal when the button is clicked
  const handleShow = () => {
    setShowModal(true);
  };

  // set state of ItemName when the value changes
  const MenuItemNameHandler = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };

  // set state of Price when the value changes
  const MenuItemPriceHandler = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  // set state of Description when the value changes
  const MenuItemDescriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  // set state of Image name when the value changes from the dropdown
  const MenuItemImageNameHandler = (e) => {
    e.preventDefault();
    setImageName(e.target.value);
  };

  const handleAddMenuItem = () => {
    let token = localStorage.getItem("token");

    if (token) {
      // Makes a call to the API to create a menu item
      fetch(`${FANDOS_API_URL}/menu/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        // Passing in relevant information
        body: JSON.stringify({
          name: itemName,
          price: price,
          imageName: imageName,
          description: description,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // Updating state to prepare for next new menu item
          setDisplayMenu([...displayMenu, res]);
          setItemName("");
          setPrice(0.0);
          setImageName("full-chicken");
          setDescription("");
          setShowModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div style={{ padding: "25px" }}>
        <h2>Create new menu items:</h2>
        {/* A form to add a menu item */}
        <Button variant="success" onClick={handleShow}>
          Add
        </Button>
      </div>
      <div>
        <h2 style={{ padding: "25px" }}>View/Delete menu items:</h2>
        {/* Modal that pops up on "add" button click containing form for adding a new menu item */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Menu Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row style={{ padding: "20px" }}>
                <Col>
                  {/* Calls MenuItemNameHandler */}
                  <Form.Control
                    onChange={MenuItemNameHandler}
                    placeholder="Name"
                  />
                </Col>
              </Row>
              <Row style={{ padding: "20px" }}>
                <Col>
                  {/* Calls MenuItemPriceHandler */}
                  <Form.Control
                    onChange={MenuItemPriceHandler}
                    placeholder="Price"
                  />
                </Col>
              </Row>
              <Row style={{ padding: "20px" }}>
                <Col>
                  {/* Calls MenuItemDescriptionHandler */}
                  <Form.Control
                    onChange={MenuItemDescriptionHandler}
                    placeholder="Description"
                  />
                </Col>
              </Row>

              <Row style={{ padding: "20px" }}>
                <Col>
                  {/* Calls MenuItemImageNameHandler */}
                  <Form.Label>Select an image</Form.Label>
                  <Form.Select
                    onChange={MenuItemImageNameHandler}
                    value={imageName}
                  >
                    {/* Maps through a list of images */}
                    {Images.map((pic) => (
                      <option key={pic}>{pic}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* Cancels adding a new menu item by closing the modal */}
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {/* Calls handleAddMenuItem to save the new menu item*/}
            <Button variant="success" onClick={handleAddMenuItem}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Adds a list of menu items with a delete button */}
        <AdminMenu displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
      </div>
    </div>
  );
}

export default Dashboard;
