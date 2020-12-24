import React from "react";
import axios from "axios";
import Login from "./Login";
import Me from "./Me";
import jwt from "jsonwebtoken";
//const apiUrl = "http://localhost:8080";

// get the token from localstorage and insert to req's headers
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (token && refreshToken) {
      const decodedToken = jwt.decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ token: refreshToken });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        return fetch("http://localhost:8080/token", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            localStorage.setItem("token", result.accesstoken);
            token = result.accesstoken;
            config.headers.authorization = `Bearer ${token}`;
            return config;
          })
          .catch((error) => {
            return config;
          });

      } else {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      }
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  const token = localStorage.getItem("token");
  return <div className="App">{token ? <Me /> : <Login />}</div>;
}

export default App;
