import React from "react";
import { CustomDialog } from "react-st-modal";
import AdminUpdateFromModal from "./AdminUpdateFromModal";
import "./Admin.css";

const AdminUpdateFrom = (props) => {
  return (
    <input
      type="submit"
      value="Update"
      onClick={async () => {
        const result = await CustomDialog(
          <AdminUpdateFromModal
            adminList={props.listAdmin}
            Render={props.render}
          />,
          {
            title: "Update Admin Info",
            showCloseIcon: true,
            isCanClose: true,
          }
        );
      }}
      className="Add-button"
    />
  );
};

export default AdminUpdateFrom;
