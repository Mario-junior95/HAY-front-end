import React, { useState, useEffect } from "react";
import Axios from "axios";
import GroupAvatar from "../../images/groupavatar.jpeg";
const ViewSupportGroupFormModal = (props) => {
  const { setRender } = props.Render;
  console.log({ setRender });

  const [error, setError] = useState("");

  const [SupportGroupList, setSupportGroupList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/support-group", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("tokens"),
      },
    }).then((response) => {
      setSupportGroupList(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (SupportGroupList.length > 1) {
      try {
        Axios.delete(
          `http://localhost:8000/api/support-group/${props.supportList.id}`,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("tokens"),
            },
          }
        ).then((response) => {
          console.log(response.data);
          setRender((prev) => !prev);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("You cannot delete this Group! You will lose all your data");
    }
  };

  return (
    <div>
      <div className="sessionmodal" style={{ padding: "10%" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>English Title :</span>
          {props.supportList.title_en}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Arabic Title :</span>
          {props.supportList.title_ar}
        </p>
        {props.supportList.image === "null" ? (
          <img src={GroupAvatar} style={{ width: "30%" }} />
        ) : (
          <img
            style={{ width: "30%" }}
            src={`http://localhost:8000/storage/${props.supportList.image}`}
            alt="error"
          />
        )}
        <p>
          <span style={{ fontWeight: "bold" }}>English Description :</span>
          {props.supportList.description_en}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Arabic Description :</span>
          {props.supportList.description_ar}
        </p>
        <span style={{ color: "red" }}>{error}</span>
        <br />
        <input
          type="submit"
          value="delete"
          style={{ padding: " 2.5%", backgroundColor: "red" }}
          onClick={(id) => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default ViewSupportGroupFormModal;
