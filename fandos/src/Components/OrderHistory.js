import React from "react";
import { useEffect } from "react";
import { FANDOS_API_URL } from "../config/config";
import PrevOrderItem from "../Components/PrevOrderItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    // list of previous orders
    <div>
    
      <h1 style={{ paddingTop: "50px", textAlign: "center" }}>Order History</h1>
      <Row>
        {prevOrders.map((item) => {
          return (
            <Col>
              <PrevOrderItem
                orderNumber={item.orderNumber}
                items={item.items}
                date={item.date}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default OrderHistory;
