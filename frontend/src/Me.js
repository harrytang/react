/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Me() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/myaccount")
      .then(function (response) {
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch(function (error) {
        //localStorage.clear();
        //window.location.reload(false);
        console.log(error);
      });
  }, []);

  return (
    <div>
      My Account
      <br />
      Username: {username}
      <br />
      Email: {email}
      <br />
    </div>
  );
}
