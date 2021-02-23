import { CustomDialog } from "react-st-modal";
import React from 'react';
import HomeUpdateModal from "./HomeUpdateModal";

function ViewTherapyTrans(props) {


    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="Update" style={{width:"70%", padding:"4.5%" , marginTop:"12%" , marginRight:"20vw"}}
                onClick={async () => {
                    const result = await CustomDialog(
                        <HomeUpdateModal renderr={props.render} idd={props.id} dataa={props.data} />,
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