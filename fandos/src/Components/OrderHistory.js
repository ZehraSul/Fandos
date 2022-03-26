import React from "react";
import { useEffect } from "react";
import { FANDOS_API_URL } from "../config/config";
import PrevOrderItem from "../Components/PrevOrderItem";

function OrderHistory({ prevOrders, setPrevOrders, setUserToken, userToken }) {
  useEffect(() => {
    // if user is already logged in, get the token and set it as userToken
    let token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
    // if user is logged in display all their previous orders
    if (userToken) {
      fetch(`${FANDOS_API_URL}/orders/displayAll`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Uses token for authorization
          Authorization: "Bearer " + userToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            setPrevOrders(data);
            // console.log(prevOrders);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userToken]);
  return (
    <div>
      <h1>Order History</h1>
      {prevOrders.map((item) => {
        return (
          <PrevOrderItem
            orderNumber={item.orderNumber}
            items={item.items}
            date={item.date}
          />
        );
      })}
    </div>
  );
}

export default OrderHistory;
