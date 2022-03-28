import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Menu from "./Components/Menu";
import Register from "./Components/Register";
import LandingPage from "./Components/LandingPage";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { FANDOS_API_URL } from "./config/config";
import OrderHistory from "./Components/OrderHistory";
import Cart from "./Components/Cart";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userToken, setUserToken] = useState("");
  let [prevOrders, setPrevOrders] = useState([]);
  let [displayMenu, setDisplayMenu] = useState([]);
  let [cartItems, setCartItems] = useState([]);

  /* Using useEffect to make the initial call to my api to display menu*/
  useEffect(() => {
    // if user is already logged in, get the token and set it as userToken
    let token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      setIsLoggedIn(true);
    }
    // if user is logged in display all their tasks
    if (userToken) {
      fetch(`${FANDOS_API_URL}/menu/displayAll`, {
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
            setDisplayMenu(data);
            // console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userToken]);

  return (
    <div className="App">
      <Navbar
        setUserToken={setUserToken}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCartItems={setCartItems}
        setPrevOrders={setPrevOrders}
      />

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              setUserToken={setUserToken}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="menu"
          element={
            <PrivateRoute>
              <Menu
                displayMenu={displayMenu}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken} />
          }
        />
        <Route
          path="register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setUserToken={setUserToken}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="orderhistory"
          element={
            <PrivateRoute>
              <OrderHistory
                prevOrders={prevOrders}
                setPrevOrders={setPrevOrders}
                setUserToken={setUserToken}
                userToken={userToken}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart
                userToken={userToken}
                setUserToken={setUserToken}
                cartItems={cartItems}
                setCartItems={setCartItems}
                prevOrders={prevOrders}
                setPrevOrders={setPrevOrders}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function useAuth() {
  let token = localStorage.getItem("token");
  return token;
}

function PrivateRoute({ children }) {
  return useAuth() ? children : <Navigate to="/login" />;
}

export default App;
