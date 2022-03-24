import React from "react";
import CarouselPromo from "./CarouselPromo";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function LandingPage({ isLoggedIn }) {
  return (
    <div>
      <CarouselPromo />

      {!isLoggedIn ? (
        <div className="py-5" style={{ width: "50%", margin: "auto" }}>
          <h2>Want some chicken? </h2>
          <Button as={Link} variant="outline-danger" to="/login">
            Login
          </Button>
        </div>
      ) : (
        <Navigate to="/menu" />
      )}
    </div>
  );
}

export default LandingPage;
