import React, { useState} from "react";
import "./AddAdmin.css";

import { Redirect } from "react-router-dom";


import Axios from "axios";
import Swal from "sweetalert2";

const AddAdmin = (props) => {
  const { setRender } = props.render;

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  const handleButton = () => {
    Swal.fire("Added Successfully!", "You clicked the button!", "success");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("null");
  const [listAdmin, setListAdmin] = useState([]);

  /** error States */

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setFirstNameErr("");
    setLastNameErr("");
    setUserNameErr("");
    setPasswordErr("");
    setEmailErr("");
  };

  /**   Create Admin */

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("image", image);
    data.append("username", userName);
    data.append("password", password);
    try {
      await Axios.post("http://localhost:8000/api/admin", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
        if (response.data.status === "Token is Expired") {
          expireToken();
          return window.location.reload();
        } else {
          setListAdmin(response.data);
          setRender((prev) => !prev);
          clearData();
          handleButton();
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setFirstNameErr(error.response.data.error.firstname);
        setLastNameErr(error.response.data.error.lastname);
        setUserNameErr(error.response.data.error.username);
        setPasswordErr(error.response.data.error.password);
        setEmailErr(error.response.data.error.email);
      }
    }
  };

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content modal-content-admin">
          <div className="modal-header">
            <h4 className="add-title">Add an Admin to the list</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body">
              <br />
              <span style={{ color: "red" }}>{firstNameErr}</span>
              <input
                type="text"
                placeholder="Enter firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <span style={{ color: "red" }}>{lastNameErr}</span>
              <input
                type="text"
                placeholder="Enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <span style={{ color: "red" }}>{emailErr}</span>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <span style={{ color: "red" }}>{userNameErr}</span>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <span style={{ color: "red" }}>{passwordErr}</span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <input type="submit" value="Submit" onClick={handleAdd} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
