import React, { useState } from "react";
import { useDialog } from "react-st-modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import "./PasswordFormModal.css";

const PasswordFormModal = () => {
  const dialog = useDialog();

  const history = useHistory();

  const ChangePasswordAlert = () => {
    confirmAlert({
      message: `Are you sure you want to change your password ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setPassword("");
            setConfirmPassword("");
            setPassErr("");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [passErr, setPassErr] = useState("");

  const ChangePassword = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("password", password);

    try {
      await Axios.post(
        `http://localhost:8000/api/updatePassword/${localStorage.getItem(
          "id"
        )}?_method=PUT `,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        }
      ).then((response) => {
        if (password === confrimPassword) {
          ChangePasswordAlert();
          console.log(response.data);
          localStorage.getItem("tokens");
        } else {
          setPassErr("Password confirmation does not match");
        }
      });
    } catch (error) {
      if (error.response) {
        setPassErr(error.response.data.error.password);
        console.clear();
      } else if (error.request) {
        console.error(error.request.data.error);
      } else {
        console.error("Error", error.message.data.error);
      }
    }
  };

  return (
    <div>
      <form>
        <span style={{ color: "red" }}>{passErr}</span>
        <input
          value={password}
          type="password"
          placeholder="New-Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          value={confrimPassword}
          type="password"
          placeholder="Confirm New-Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <input type="submit" value="Submit" onClick={ChangePassword} />
      </form>
    </div>
  );
};

export default PasswordFormModal;
