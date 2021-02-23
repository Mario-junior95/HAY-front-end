import { CustomDialog } from "react-st-modal";
import React from 'react';
import ViewTherapyModal from './ViewTherapyModal';

function ViewTherapyTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="Group Therapy" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <ViewTherapyModal leng={props.length} renderr={props.render} dataa={props.data} />,
                        {
                            title: "Therapy",
                            showCloseIcon: true,
                        }
                    );
                }}


            />
        </div>
    );
}

export default ViewTherapyTrans;