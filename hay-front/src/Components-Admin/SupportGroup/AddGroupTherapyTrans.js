import { CustomDialog } from "react-st-modal";
import React from "react";
import AddGroupTherapyModal from "./AddGroupTherapyModal";

function AddGroupTherapyTrans(props) {
  return (
    <div>
      <input
        type="submit"
        style={{ padding: "10px" }}
        value="add Support Group "
        onClick={async () => {
          const result = await CustomDialog(
            <AddGroupTherapyModal renderr={props.render} />,
            {
              title: "Add Group Therapy",
              showCloseIcon: true,
            }
          );
        }}
      />
    </div>
  );
}

export default AddGroupTherapyTrans;
