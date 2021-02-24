import React from "react";
import Avatar from "../../images/avatar.png";

const ModalViewUsers = (props) => {
  return (
    <div>
      <div className="user-admin-panel-wrapper" key={props.user.id}>
        <div className="user-image-admin-panel">
          {props.user.image !== null ? (
            <img
              src={"http://localhost:8000/storage/" + props.user.image}
              alt="user-image"
            />
          ) : (
            <img src={Avatar} alt="avatar user image" />
          )}
        </div>
        <div className="">
          <div className="left user-admin-panel">
            <span>Name :</span>
            {props.user.name}
          </div>
          <div className="left user-admin-panel">
            <span>Email :</span>
            {props.user.email}
          </div>
          <div className="left user-admin-panel">
            <span>Phone :</span>
            {props.user.phone}
          </div>
          <div className="left user-admin-panel">
            <span>Age :</span>
            {props.user.age}
          </div>
          <div className="left user-admin-panel">
            <span>Occupation :</span>
            {props.user.occupation}
          </div>
          <div className="left user-admin-panel">
            <span>Education :</span>
            {props.user.education}
          </div>
          <div className="left user-admin-panel">
            <span>Area :</span>
            {props.user.area}
          </div>
          <div className="left user-admin-panel">
            <span>Interests :</span>
            {props.user.interests}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewUsers;
