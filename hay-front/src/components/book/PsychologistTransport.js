import { CustomDialog } from "react-st-modal";
import React from 'react';
import PsychologistModal from "./PsychologistModal";

function PsychologistTransport(props) {

    
    return (
        <div className="col-md-1" className="sessionmodal" >
            <button id="signup" style={{width:"100px" , borderRadius:"15px"}}
                onClick={async () => {
                    const result = await CustomDialog(
                        <PsychologistModal language={props.lang} psycho = {props.psy} />,
                        {
                            title: "Psychologist Details",
                            showCloseIcon: true,
                        }
                    );
                }}
            >
                Psychologist
      </button>
        </div>
    );
}

export default PsychologistTransport;