import React, { useState } from "react";
import "./Admin.css";
import Axios from "axios";
import Swal from "sweetalert2";

import { Redirect } from "react-router-dom";

const AdminUpdateFromModal = (props) => {
  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  /** Sweet Alert */

  const handleButton = () => {
    Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    setEmailErr("");
    setFirstNameErr("");
    setLastNameErr("");
    setUserNameErr("");
  };

  const { setRender } = props.Render;

  const [firstName, setFirstName] = useState(props.adminList.firstname);
  const [lastName, setLastName] = useState(props.adminList.lastname);
  const [userName, setUsername] = useState(props.adminList.username);
  const [email, setEmail] = useState(props.adminList.email);
  const [image, setImage] = useState("empty");

  /** Error State */
  const [firstnameErr, setFirstNameErr] = useState("");
  const [lastnameErr, setLastNameErr] = useState("");
  const [usernameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  /** Update Admin */

  const updateInfo = async () => {
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("username", userName);
    data.append("email", email);
    data.append("image", image);

    try {
      await Axios.post(
        `http://localhost:8000/api/admin/${props.adminList.id}?_method=PUT `,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        }
      ).then((response) => {
        if (response.data.status === "Token is Expired") {
          expireToken();
          return window.location.reload();
        } else {
          console.log(response.data);
          setRender((prev) => !prev);
          handleButton();
        }
      });
    } catch (error) {
      if (error.response) {
        setFirstNameErr(error.response.data.error.firstname);
        setLastNameErr(error.response.data.error.lastname);
        setUserNameErr(error.response.data.error.username);
        setEmailErr(error.response.data.error.email);
      }
    }
  };

  return (
    <form>
      <span style={{ color: "red" }}>{usernameErr}</span>
      <br />
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <span style={{ color: "red" }}>{firstnameErr}</span>
      <br />
      <input
        type="text"
        placeholder="First-Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <span style={{ color: "red" }}>{lastnameErr}</span>
      <input
        type="text"
        placeholder="Last-Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <span style={{ color: "red" }}>{emailErr}</span>
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input
        type="submit"
        value="Submit"
        onClick={(e) => {
          updateInfo(props.adminList);
          e.preventDefault();
        }}
      />
    </form>
  );
};

export default AdminUpdateFromModal;
