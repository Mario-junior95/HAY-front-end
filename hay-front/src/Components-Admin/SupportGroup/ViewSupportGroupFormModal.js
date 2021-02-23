import React from "react";

const ViewSupportGroupFormModal = (props) => {
  const { setRender } = props.Render;
  console.log({ setRender });

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
        <img
          style={{ width: "30%" }}
          src={`http://localhost:8000/storage/${props.supportList.image}`}
          alt="error"
        />
        <p>
          <span style={{ fontWeight: "bold" }}>English Description :</span>
          {props.supportList.description_en}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Arabic Description :</span>
          {props.supportList.description_ar}
        </p>
      </div>
    </div>
  );
};

export default ViewSupportGroupFormModal;
