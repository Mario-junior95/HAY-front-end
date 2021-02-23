import { CustomDialog } from "react-st-modal";
import React from 'react';
import ViewBookedSessionsModal from './ViewBookedSessionsModal';

function ViewBookedSessionsTrans(props) {

    return (
        <div className="col-md-1" className="sessionmodal" >
            <input type="submit" value="View Bookings" style={{backgroundColor:"blue" , padding: "10px" }}
                onClick={async () => {
                    const result = await CustomDialog(
                        <ViewBookedSessionsModal />,
                        {
                            title: "Booked Sessions",
                            showCloseIcon: true,
                        }
                    );
                }}

            />
        </div>
    );
}

export default ViewBookedSessionsTrans;