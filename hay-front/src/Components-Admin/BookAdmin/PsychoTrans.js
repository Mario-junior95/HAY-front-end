import { CustomDialog } from "react-st-modal";
import React from 'react';
import PsychoModal from './PsychoModal';

function PsychologistTransport(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="psychologist" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <PsychoModal />,
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