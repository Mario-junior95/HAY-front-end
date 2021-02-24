import { CustomDialog } from "react-st-modal";
import React from "react";
import IndividualSessionSupport from "./IndividualSessionSupport";

function SupportSessionTransport(props) {
  console.log(props.psy)
  return (
    <div className="col-md-1" className="sessionmodal">
      <button
        id="signup"
        style={{ width: "90px", borderRadius: "15px" }}
        onClick={async () => {
          const result = await CustomDialog(
            <IndividualSessionSupport
              psycho={props.psy}  
              language={props.lang}
              dat={props.data}
            />,
            {
              title: "Session Details",
              showCloseIcon: true,
            }
          );
        }}
      >
        View
      </button>
    </div>
  );
}

export default SupportSessionTransport;
