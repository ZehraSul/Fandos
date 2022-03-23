import "./App.css";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Register from "./Components/Register";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [showRegisterPage, setShowRegisterPage] = useState(false);
  let [userToken, setUserToken] = useState("");
  let [orderHistory, setOrderHistory] = useState([]);

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
      // TODO: Load Menu
    }
  }, [userToken]);

  return (
    <div className="App">
      <Navbar
        setUserToken={setUserToken}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {isLoggedIn === true ? (
        <Main setUserToken={setUserToken} isLoggedIn={isLoggedIn} />
      ) : showRegisterPage ? (
        <Register
          setIsLoggedIn={setIsLoggedIn}
          setShowRegisterPage={setShowRegisterPage}
          setUserToken={setUserToken}
        />
      ) : (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setShowRegisterPage={setShowRegisterPage}
          setUserToken={setUserToken}
        />
      )}
    </div>
  );
}

export default App;
