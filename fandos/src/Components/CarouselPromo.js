import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Pic1 from "../images/full-chicken.jpg";
import Pic2 from "../images/half-chicken.jpg";
import Pic3 from "../images/quarter-chicken.jpg";

function CarouselPromo() {
  return (
    <div>
      <Carousel variant="light">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Pic1}
            height="450px"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Pic2}
            height="450px"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Pic3}
            height="450px"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPromo;
