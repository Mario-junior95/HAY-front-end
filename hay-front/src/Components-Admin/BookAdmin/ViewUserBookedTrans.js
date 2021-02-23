import { CustomDialog } from "react-st-modal";
import React from 'react';
import ViewUserBooked from './ViewUserBooked';

function ViewUserBookedTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="View User" style={{ padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <ViewUserBooked user={props.data}  />,
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

export default ViewUserBookedTrans;