import React from "react";
import { CustomDialog } from "react-st-modal";
import ModalViewUser from "./ModalViewUser";

const UserViewButton = (props) => {
  return (
    <input
      type="submit"
      value="View User Info"
      onClick={async () => {
        await CustomDialog(<ModalViewUser user={props.user} />, {
          title: props.user.name + "'s Informations",
          showCloseIcon: true,
          isCanClose: true,
        });
      }}
      className="event-button"
    />
  );
};

export default UserViewButton;
