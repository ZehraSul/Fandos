import React from "react";
import Button from "react-bootstrap/Button";
import { FANDOS_API_URL } from "../config/config";

function DeleteMenuItem({ id, displayMenu, setDisplayMenu }) {
  const deleteHandler = (e) => {
    let token = localStorage.getItem("token");
    if (token) {
      // Calls API to delete the menu item
      fetch(`${FANDOS_API_URL}/menu/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        // uses id to find which item to delete
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then((res) => {
          // update state to show current items
          setDisplayMenu([...displayMenu.filter((m) => m._id !== id)]);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    /* Button for deleting a menu item */
    <Button type="submit" variant="danger" onClick={deleteHandler}>
      Delete
    </Button>
  );
}

export default DeleteMenuItem;
