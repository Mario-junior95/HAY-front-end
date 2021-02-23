import { CustomDialog } from "react-st-modal";
import React from 'react';
import BookAdminModal from './BookAdminModal';

function PsychologistTransport(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="create Session" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <BookAdminModal renderr={props.render} id={props.therapyId} />,
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