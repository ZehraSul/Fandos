import React from "react";
import Carousel from "react-bootstrap/Carousel";

// Created a react bootstrap carousel component with some food images for the landing page.
function CarouselPromo() {
  return (
    <div style={{ width: "50%", margin: "auto", paddingTop: "50px" }}>
      <Carousel variant="light">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"/images/full-chicken.jpg"}
            height="450px"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"/images/half-chicken.jpg"}
            height="450px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"/images/quarter-chicken.jpg"}
            height="450px"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPromo;
