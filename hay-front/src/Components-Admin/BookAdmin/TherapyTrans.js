import { CustomDialog } from "react-st-modal";
import React from 'react';
import TherapyModal from './TherapyModal';

function TherapyTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="update therapy" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <TherapyModal renderr={props.render} id={props.therapyId} dataa={props.data} />,
                        {
                            title: "Therapy Details",
                            showCloseIcon: true,
                        }
                    );
                }}

            />
        </div>
    );
}

export default TherapyTrans;