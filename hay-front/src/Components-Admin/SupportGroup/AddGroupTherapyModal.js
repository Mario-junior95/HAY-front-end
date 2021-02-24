import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
// The element to be shown in the modal window

function UpdateSessionModal(props) {
  const { setRender } = props.renderr;
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [image, setImage] = useState("null");
  const [titleEnErr, setTitleEnErr] = useState("");
  const [titleArErr, setTitleArErr] = useState("");
  const [descriptionArErr, setdescriptionArErr] = useState("");
  const [descriptionEnErr, setdescriptionEnErr] = useState("");

  const handleButton = () => {
    Swal.fire("Added Successfully!", "You clicked the button!", "success");
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  const add = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title_en", titleEn);
    data.append("title_ar", titleAr);
    data.append("image", image);
    data.append("description_en", descriptionEn);
    data.append("description_ar", descriptionAr);

    try {
      await Axios.post("http://localhost:8000/api/support-group", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
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
        setTitleArErr(error.response.data.errors.title_ar);
        setTitleEnErr(error.response.data.errors.title_en);
        setdescriptionEnErr(error.response.data.errors.description_en);
        setdescriptionArErr(error.response.data.errors.description_ar);
      }
    }
  };

  return (
    <div className="sessionmodal">
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          paddingBottom: "2%",
        }}
      >
        {titleEnErr ? <div style={{ color: "red" }}>{titleEnErr}</div> : ""}
        <input
          style={{ margin: "3% auto" }}
          value={titleEn}
          type="text"
          placeholder="new English Title "
          onChange={(e) => {
            setTitleEn(e.target.value);
          }}
        />
        <div style={{ color: "red" }}>{titleArErr}</div>
        <input
          style={{ margin: "3% auto" }}
          value={titleAr}
          type="text"
          placeholder="new Arabic Title "
          onChange={(e) => {
            setTitleAr(e.target.value);
          }}
        />
        <input
          style={{ margin: "3% auto" }}
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        {descriptionEnErr ? (
          <div style={{ color: "red" }}>{descriptionEnErr}</div>
        ) : (
          ""
        )}
        <input
          style={{ margin: "3% auto" }}
          value={descriptionEn}
          type="text"
          placeholder="new English description "
          onChange={(e) => {
            setDescriptionEn(e.target.value);
          }}
        />
        <div style={{ color: "red" }}>{descriptionArErr}</div>
        <input
          style={{ margin: "3% auto" }}
          value={descriptionAr}
          type="text"
          placeholder="new Arabic description "
          onChange={(e) => {
            setDescriptionAr(e.target.value);
          }}
        />
        <input
          type="submit"
          value="add"
          style={{ width: "15%", padding: "1%", margin: "0 auto" }}
          onClick={add}
        />
      </form>
    </div>
  );
}
export default UpdateSessionModal;
