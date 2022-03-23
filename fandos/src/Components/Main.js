import React from "react";
import "../css/Main.css";
import CarouselPromo from "./CarouselPromo";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import OrderHistory from "./OrderHistory";

function Main() {
  return (
    <div>
      {/*<CarouselPromo />*/}
      <h1>Logged In!</h1>
      <Menu />
      {/*<OrderHistory />*/}
    </div>
  );
}

export default Main;
