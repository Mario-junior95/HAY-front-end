import React from "react";
import { CustomDialog } from "react-st-modal";
import UpdateSupportGroupModal from "./UpdateSupportGroupModal";

const UpdateSupportGroupForm = (props) => {
  return (
    <div
      className="col-md-1"
      className="sessionmodal"
      style={{ position: "relative", bottom: "12px" }}
    >
      <input
        type="submit"
        value="Update Support"
        style={{ padding: "10px" }}
        onClick={async () => {
          const result = await CustomDialog(
            <UpdateSupportGroupModal supportList={props.listSupport}  Render={props.render}/>,
            {
              title: "Support",
              showCloseIcon: true,
              isCanClose: true,
            }
          );
        }}
        className="Add-button"
      />
    </div>
  );
};

export default UpdateSupportGroupForm;
