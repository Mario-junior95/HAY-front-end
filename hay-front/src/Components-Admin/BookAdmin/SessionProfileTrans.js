import { CustomDialog } from "react-st-modal";
import React from 'react';
import SessionProfileModal from './SessionProfileModal';

function SessionProfileTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="View" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <SessionProfileModal dataa={props.data} />,
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

export default SessionProfileTrans;