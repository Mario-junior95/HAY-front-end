import { CustomDialog } from "react-st-modal";
import React from 'react';
import SessionModal from './SessionModal';

function TherapyTransport(props) {
    return (
        <div className="col-md-1" className="sessionmodal" >
            <button id="signin" style={{width:"90px" , borderRadius:"15px"}}
                onClick={async () => {
                    const result = await CustomDialog(
                        <SessionModal language = {props.lang}/>,
                        {
                            title: "Sessions List",
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

export default TherapyTransport;