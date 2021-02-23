import { CustomDialog } from "react-st-modal";
import React from "react";
import AddPsychoModal from "./AddPsychoTransModal";

function PsychologistTransport(props) {
  return (
    <div>
      <input
        type="submit"
        value="add psychologist"
        onClick={async () => {
          const result = await CustomDialog(
            <AddPsychoModal renderr={props.render} />,
            {
              title: "Psychologist Details",
              showCloseIcon: true,
            }
          );
        }}
      />
    </div>
  );
}

export default PsychologistTransport;
