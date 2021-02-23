import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const UpdateSupportGroupModal = (props) => {
  const { setRender } = props.Render;

  const [titleEn, setTitleEn] = useState(props.supportList.title_en);
  const [titleAr, setTitleAr] = useState(props.supportList.title_ar);
  const [descriptionAr, setDescriptionAr] = useState(
    props.supportList.description_ar
  );
  const [descriptionEn, setDescriptionEn] = useState(
    props.supportList.description_en
  );
  const [image, setImage] = useState("empty");

  /** Errors */

  const [titleEnErr, setTitleEnErr] = useState("");
  const [titleArErr, setTitleArErr] = useState("");
  const [descriptionArErr, setDescriptionArErr] = useState("");
  const [descriptionEnErr, setDescriptionEnErr] = useState("");
  const [imageErr, setImageErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  /** Sweet Alert */

  const handleButton = () => {
    Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    setTitleArErr("");
    setTitleEnErr("");
    setDescriptionEnErr("");
    setDescriptionArErr("");
    setImageErr("");
  };



  const updateInfo = async () => {
    const data = new FormData();
    data.append("title_en", titleEn);
    data.append("title_ar", titleAr);
    data.append("description_en", descriptionEn);
    data.append("description_ar", descriptionAr);
    data.append("image", image);

    try {
      await Axios.post(
        `http://localhost:8000/api/support-group/${props.supportList.id}?_method=PUT `,
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
        setTitleEnErr(error.response.data.errors.title_en);
        setTitleArErr(error.response.data.errors.title_ar);
        setDescriptionEnErr(error.response.data.errors.description_en);
        setDescriptionArErr(error.response.data.errors.description_ar);
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
        <span style={{ color: "red" }}>{titleEnErr}</span>
        <br />
        <input
          style={{ margin: "3% auto" }}
          value={titleEn}
          type="text"
          placeholder="new English Title "
          onChange={(e) => setTitleEn(e.target.value)}
        />
        <br />
        <span style={{ color: "red" }}>{titleArErr}</span>
        <br />
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
        <br />
        <span style={{ color: "red" }}>{descriptionEnErr}</span>
        <br />
        <input
          style={{ margin: "3% auto" }}
          value={descriptionEn}
          type="text"
          placeholder="new English description "
          onChange={(e) => {
            setDescriptionEn(e.target.value);
          }}
        />
        <br />
        <span style={{ color: "red" }}>{descriptionArErr}</span>
        <br />
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
          value="update"
          style={{ width: "15%", padding: "1%", margin: "0 auto" }}
          onClick={(e) => {
            updateInfo(props.supportList.id);
            e.preventDefault();
          }}
        />
      </form>
    </div>
  );
};

export default UpdateSupportGroupModal;
