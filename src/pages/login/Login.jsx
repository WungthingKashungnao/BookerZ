import React, { useContext, useState } from "react";
import "./login.css";

import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const Login = () => {
  //state to send credentials by user to backend
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  //  form authcontext
  const { loading, error, dispatch } = useContext(AuthContext);

  //function to handle credentials of username and password
  const handleChange = (e) => {
    //setting credentails for username and password
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //   function to login button
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      //going to login route and giving credentials to login
      const res = await axios.post(`${BACKEND_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  //   console.log(user);

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
