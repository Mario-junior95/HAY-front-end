import React from "react";
import { CustomDialog } from "react-st-modal";
import CreateSessionModal from "./CreateSessionModal";


const CreateSessionFrom = (props) => {
  return (
    <div
      className="col-md-1"
      className="sessionmodal"
      style={{ position: "relative", bottom: "-30px" }}
    >
      <input
        type="submit"
        value="Create Session"
        style={{ padding: "10px" }}
        onClick={async () => {
          const result = await CustomDialog(<CreateSessionModal />, {
            title: "Session Details",
            showCloseIcon: true,
            isCanClose: true,
          });
        }}
        className="Add-button"
      />
    </div>
  );
};

export default CreateSessionFrom;
