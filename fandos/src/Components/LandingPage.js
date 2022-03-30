import React from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CarouselPromo from "./CarouselPromo";

// landing page displays when user is not logged in, if user is logged in displays menu page
function LandingPage({ isLoggedIn }) {
  return (
    <div>
      <CarouselPromo />
      {!isLoggedIn ? (
        <div className="py-5" style={{ width: "50%", margin: "auto" }}>
          <h2>Want some chicken? </h2>
          <Button as={Link} variant="danger" to="/login">
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
