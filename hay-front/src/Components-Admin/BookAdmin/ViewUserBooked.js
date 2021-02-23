import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Avatar from '../../Images/avatar.png'
// The element to be shown in the modal window

function ViewUserBooked(props) {


    const dialog = useDialog();
    const [value, setValue] = useState();



    return (
        <div className="sessionmodal" >
              <p><span style={{fontWeight:"bold"}}>Name :</span>{props.user.name}</p> 
              {props.user.image === null ? (
        <img style={{ width: "30%" }} src={Avatar} alt="error_profile" />
      ) : (
          <img style={{ width: "30%" }}
            src={`http://localhost:8000/storage/${props.user.image}`}
            alt="error_profile"
          />
        )}
              <p><span style={{fontWeight:"bold"}}>Email :</span>{props.user.email}</p>
              <p><span style={{fontWeight:"bold"}}>Phone :</span> {props.user.phone}</p>
              <p><span style={{fontWeight:"bold"}}>Age :</span>{props.user.age}</p>
              <p><span style={{fontWeight:"bold"}}>Area :</span>{props.user.area}</p>
              <p><span style={{fontWeight:"bold"}}>Education :</span>{props.user.education}</p>
              <p><span style={{fontWeight:"bold"}}>Occupation :</span>{props.user.occupation}</p>
              <p> <span style={{fontWeight:"bold"}}>Interests :</span>{props.user.interests}</p>

        </div>
    );
}
export default ViewUserBooked;