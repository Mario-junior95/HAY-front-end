import { CustomDialog } from "react-st-modal";
import React from "react";
import UpdatePsycho from "./UpdatePsycho";

function UpdatePsychoTrans(props) {
  return (
    <div className="col-md-1" className="sessionmodal">
      <input
        type="submit"
        value="update"
        style={{ padding: "10px" }}
        onClick={async () => {
          const result = await CustomDialog(
            <UpdatePsycho
              renderr={props.render}
              id={props.psychoId}
              dataa={props.data}
            />,
            {
              title: "Psychologist",
              showCloseIcon: true,
            }
          );
        }}
      />
    </div>
  );
}

export default UpdatePsychoTrans;
