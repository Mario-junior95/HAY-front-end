import React from "react";
import { Link, useHistory } from "react-router-dom";
import image from "../../images/Hay-Logo.jpeg";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styled from "styled-components";
import "./Menu.css";
import PasswordForm from "./PasswordForm";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  padding: 2em;
  line-height: 2.6;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 1.4em;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.2em;
    color: black;
    text-decoration: none;

    @media (max-width: 576px) {
      font-size: 1.5em;
      text-align: center;
    }
  }
`;

const Menu = ({ open }) => {
  const history = useHistory();
  const username = localStorage.getItem("username");

  const submit = () => {
    confirmAlert({
      message: `Are you sure ${username} you want to exit!!`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("tokens");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
            localStorage.removeItem("images");
            history.push("/");
          },
        },
        {
          label: "No",
          onClick: () => history.push("/Admin-Management"),
        },
      ],
    });
  };

  return (
    <>
      <StyledMenu open={open}>
        <img
          src={image}
          alt="error_Logo"
          className="image_nav"
          style={{ height: "105px", width: "105px" }}
        />
        <Link to="/Admin-Management">Admins</Link>
        <Link to="/Admin-User">Users</Link>
        <Link to="/Admin-Home">Home</Link>
        <Link to="/Admin-Event">Events</Link>
        <Link to="/Admin-Book">Books</Link>
        <Link to="/Admin-Blog">Blogs</Link>
        <Link to="/Admin-Contact">Contact Us</Link>
        <PasswordForm />
        <span className="logout" type="btn btn-default" onClick={submit}>
          LOGOUT
        </span>
      </StyledMenu>
    </>
  );
};

export default Menu;
