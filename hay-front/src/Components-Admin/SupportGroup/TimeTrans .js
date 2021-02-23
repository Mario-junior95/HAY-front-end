import { CustomDialog } from "react-st-modal";
import React from "react";
import TimeModal from "./TimeModal ";

function PsychologistTransport(props) {
  return (
    <div className="col-md-1" className="sessionmodal" style = {{position:"relative" , top:"11%"}}>
      <input
        type="submit"
        value="Available times"
        style={{ padding: "10px" }}
        onClick={async () => {
          const result = await CustomDialog(
            <TimeModal renderr={props.render} />,
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
