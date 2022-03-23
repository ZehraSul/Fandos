import React from "react";
import FakeOrderHistory from "../Components/FakeOrderHistory";
import PrevOrderItem from "../Components/PrevOrderItem";

function OrderHistory() {
  return (
    <div>
      {FakeOrderHistory.map((item) => {
        return <PrevOrderItem name={item.name} price={item.price} />;
      })}
    </div>
  );
}

export default OrderHistory;
