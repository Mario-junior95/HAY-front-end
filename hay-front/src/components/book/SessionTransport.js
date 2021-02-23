import { CustomDialog } from "react-st-modal";
import React from 'react';
import IndividualSession from "./IndividualSession";

function SessionTransport(props) {
    
    return (
        <div className="col-md-1" className="sessionmodal" >
            <button id="signup" style={{width:"90px" , borderRadius:"15px"}}
                onClick={async () => {
                    const result = await CustomDialog(
                        <IndividualSession psycho={props.psy} language={props.lang} dat = {props.data}/>,
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

export default SessionTransport;