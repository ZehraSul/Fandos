import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useNavigate } from "react-router-dom";
import { FANDOS_API_URL } from "../config/config";
import Button from "react-bootstrap/Button";

// Login with Facebook
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
      {/*Creates facebook button */}
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email"
        scope="public_profile,email"
        callback={handleLogin}
        render={(renderProps) => (
          <Button variant="primary" onClick={renderProps.onClick}>
            <span style={{ paddingRight: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </span>
            Continue with Facebook
          </Button>
        )}
      />
    </div>
  );
}

// work around for allowing component to use navigation for routes
function WithNavigate(props) {
  let navigate = useNavigate();
  return <FacebookLoginButton {...props} navigate={navigate} />;
}

export default WithNavigate;
