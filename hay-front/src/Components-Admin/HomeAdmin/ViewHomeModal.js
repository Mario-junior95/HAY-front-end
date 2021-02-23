import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
// The element to be shown in the modal window

function ViewHomeModal(props) {
    const dialog = useDialog();
    const [value, setValue] = useState();
  




    return (
        <div style={{display:"grid" , gridTemplateColumns:"1fr" , padding:"5%"}} className="sessionmodal" >
         <p><span style={{fontWeight:"bold"}}>Arabic Mission Title :</span>{props.dataa.missions_title_ar}</p>
         <p><span style={{fontWeight:"bold"}}>Arabic Mission Description :</span>{props.dataa.missions_ar}</p>
         <p><span style={{fontWeight:"bold"}}>English Mission Title :</span>{props.dataa.missions_title_en}</p>
         <p><span style={{fontWeight:"bold"}}>English Mission Description :</span>{props.dataa.missions_en}</p>

         <p><span style={{fontWeight:"bold"}}>Arabic visions Title :</span>{props.dataa.visions_title_ar}</p>
         <p><span style={{fontWeight:"bold"}}>Arabic visions Description :</span>{props.dataa.visions_ar}</p>
         <p><span style={{fontWeight:"bold"}}>English visions Title :</span>{props.dataa.visions_title_en}</p>
         <p><span style={{fontWeight:"bold"}}>English visions Description :</span>{props.dataa.visions_en}</p>

        </div>
    );
}
export default ViewHomeModal;