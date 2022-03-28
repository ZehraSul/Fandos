import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FANDOS_API_URL } from "../config/config";

function GoogleLoginButton({ setUserToken, setIsLoggedIn, navigate }) {
  const handleLogin = (googleData) => {
    fetch(`${FANDOS_API_URL}/login/google`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: googleData.tokenId,
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
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <GoogleLoginButton {...props} navigate={navigate} />;
}

export default WithNavigate;
