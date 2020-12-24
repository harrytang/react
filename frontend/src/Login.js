import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/login", {
        username: state.username,
        password: state.password,
      })
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
