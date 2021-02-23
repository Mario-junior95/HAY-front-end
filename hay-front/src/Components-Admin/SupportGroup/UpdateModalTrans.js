import { CustomDialog } from "react-st-modal";
import React from "react";
import UpdateSessionModal from "./UpdateSessionModal";

function PsychologistTransport(props) {
  return (
    <div className="col-md-1" className="sessionmodal">
      <input
        type="submit"
        value="update"
        style={{ padding: "10px"}}
        onClick={async () => {
          const result = await CustomDialog(
            <UpdateSessionModal
              renderr={props.render}
              id={props.sessionId}
              sessions={props.data}
            />,
            {
              title: "Session Details",
              showCloseIcon: true,
            }
          );
        }}
      />
    </div>
  );
}

export default PsychologistTransport;
