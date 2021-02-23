import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState } from 'react';
import Avatar from '../../images/avatar.png';

// The element to be shown in the modal window

function PsychologistModal(props) {
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [ language , setLanguage] = useState(props.language)



    return (
        <div className="sessionmodal" style={{display:"flex" , flexDirection:"column"}} >
                         <span>{language === true ? <span>{props.psycho.name_en}</span> :<span>{props.psycho.name_ar}</span> }</span>

             {props.psycho.image === "empty" ? (
        <img style={{ width: "30%", margin:"0 auto" }} src={Avatar} alt="error_profile" />
      ) : (
          <img style={{ width: "30%", margin:"0 auto"  }}
            src={`http://localhost:8000/storage/${props.psycho.image}`}
            alt="error_profile"
          />
        )} <span>{language === true ? <span>{props.psycho.description_en}</span> :<span>{props.psycho.description_ar}</span> }</span>
            
        </div>
    );
}
export default PsychologistModal;