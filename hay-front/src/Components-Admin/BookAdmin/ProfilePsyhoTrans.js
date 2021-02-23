import { CustomDialog } from "react-st-modal";
import React from 'react';
import ProfilePsychoModal from './ProfilePsychoModal';

function PsychologistTransport(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="view" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <ProfilePsychoModal dataa={props.data} />,
                        {
                            title: "Psychologist",
                            showCloseIcon: true,
                        }
                    );
                }}

            />
        </div>
    );
}

export default PsychologistTransport;