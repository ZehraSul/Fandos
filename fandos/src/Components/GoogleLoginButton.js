import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FANDOS_API_URL } from "../config/config";
import Button from "react-bootstrap/Button";

function GoogleLoginButton({ setUserToken, setIsLoggedIn, navigate }) {
  const googleClientId =
    "548979504562-gccbcuh6pj3ua9n87l70q90b6gkkn22n.apps.googleusercontent.com";
  const handleLogin = (googleData) => {
    console.log(googleData);
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
          console.log(res);
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
        clientId={googleClientId}
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button variant="success" onClick={renderProps.onClick}>
            <span style={{ paddingRight: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
            </span>
            Continue with Google
          </Button>
        )}
      />
    </div>
  );
}
// work around for allowing component to use navigation for routes
function WithNavigate(props) {
  let navigate = useNavigate();
  return <GoogleLoginButton {...props} navigate={navigate} />;
}

export default WithNavigate;
