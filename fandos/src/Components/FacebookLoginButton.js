import React from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { FANDOS_API_URL } from "../config/config";

function FacebookLoginButton({ setUserToken, setIsLoggedIn, navigate }) {
  const handleLogin = (response) => {
    fetch(`${FANDOS_API_URL}/login/facebook`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: response.email,
        accessToken: response.accessToken,
      }),
    })
      .then(
        (res) => {
          return res.json();
        },
        (err) => {
          console.log(err);
        }
      )
      .then(
        (data) => {
          if (data.token) {
            // if the user exists and the token is valid, update state and store the token in local storage
            setUserToken(data.token);
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            navigate("/menu");
          } else {
            // if the token is invalid, show error
            alert("Login Failed!");
            console.log(data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  return (
    <div>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email"
        scope="public_profile,email"
        callback={handleLogin}
        icon="fa-facebook"
      />
    </div>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <FacebookLoginButton {...props} navigate={navigate} />;
}

export default WithNavigate;
