import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Avatar from "../../Images/avatar.png";

// The element to be shown in the modal window

function SessionModal(props) {
  const dialog = useDialog();
  const [value, setValue] = useState();

  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold" }}>English name : </span>
        {props.dataa.name_en}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Arabic name : </span>
        {props.dataa.name_ar}
      </p>
      {props.dataa.image === "empty" ? (
        <img style={{ width: "30%" }} src={Avatar} alt="error_profile" />
      ) : (
        <img
          style={{ width: "30%" }}
          src={`http://localhost:8000/storage/${props.dataa.image}`}
          alt="error_profile"
        />
      )}
      <p>
        <span style={{ fontWeight: "bold" }}>English description : </span>
        {props.dataa.description_en}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Arabic description : </span>
        {props.dataa.description_ar}
      </p>
    </div>
  );
}
export default SessionModal;
