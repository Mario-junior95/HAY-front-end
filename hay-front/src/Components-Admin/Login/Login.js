import React, { useState, useRef, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Login.css";
import Logo from "../../images/Hay-Logo.jpeg";
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [usernameError, setUserNameError] = useState("");

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const history = useHistory();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8000/api/admin-login", {
        username: username,
        password: password,
      }).then((response) => {
        setToken(response.data.access_token);
        {
          localStorage.setItem("username", response.data.admin.username);
          localStorage.setItem("id", response.data.admin.id);
          localStorage.setItem("images", response.data.admin.image);
          response &&
            response.data &&
            response.data.access_token &&
            localStorage.setItem("tokens", response.data.access_token);
        }
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setUserNameError(error.response.data.error.username);
        if (!error.response.data.error.username) {
          setUserNameError("Invalid Username or password");
        }
      }
    }
  };

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    setRedirect(localStorage.getItem("tokens"));
  }, []);

  if (redirect) {
    return <Redirect exact to="/Admin-Management" />;
  } else {
    <Redirect exact to="/Admin-Login" />;
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={Logo} id="icon" alt="User Icon" />
        </div>
        <form>
          <span style={{ color: "red" }}>{usernameError}</span>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="username"
            ref={inputEl}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
            onClick={HandleLogin}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
