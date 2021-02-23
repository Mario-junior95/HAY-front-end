import { CustomDialog } from "react-st-modal";
import React from 'react';
import ViewHomeModal from './ViewHomeModal';

function ViewHomeTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="View" 
                onClick={async () => {
                    const result = await CustomDialog(
                        <ViewHomeModal dataa= {props.data}/>,
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

export default ViewHomeTrans;