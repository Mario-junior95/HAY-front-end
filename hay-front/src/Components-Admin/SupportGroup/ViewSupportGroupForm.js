import React from "react";
import { CustomDialog } from "react-st-modal";

import ViewSupportGroupFormModal from "./ViewSupportGroupFormModal";

const ViewSupportGroupFrom = (props) => {
  return (
    <div
      className="col-md-1"
      className="sessionmodal"
      style={{ position: "relative", bottom: "12px" }}
    >
      <input
        type="submit"
        value="Support Group"
        style={{ padding: "10px" }}
        onClick={async () => {
          const result = await CustomDialog(
            <ViewSupportGroupFormModal supportList={props.listSupport}  Render ={props.render}/>,
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

export default ViewSupportGroupFrom;
