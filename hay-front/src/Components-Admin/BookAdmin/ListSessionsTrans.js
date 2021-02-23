import { CustomDialog } from "react-st-modal";
import React from 'react';
import ListOfSessionsModal from './ListOfSessionsModal';

function PsychologistTransport(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="List of sessions" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <ListOfSessionsModal />,
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