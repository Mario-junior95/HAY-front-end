import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

// The element to be shown in the modal window

function HomeUpdateModal(props) {
  const dialog = useDialog();
  const [value, setValue] = useState();
  const {setRender} = props.renderr;

  const [newMissiontitleAr , setnewMissionTitleAr] = useState(props.dataa.missions_title_ar)
  const [newMissionAr , setnewMissionAr] = useState(props.dataa.missions_ar)
  const [newMissiontitleEn , setnewMissionTitleEn] = useState(props.dataa.missions_title_en)
  const [newMissionEn , setnewMissionEn] = useState(props.dataa.missions_en)
  const [newVisiontitleAr , setnewvisionTitleAr] = useState(props.dataa.visions_title_ar)
  const [newVisionAr , setnewvisionAr] = useState(props.dataa.visions_ar)
  const [newVisiontitleEn , setnewvisionTitleEn] = useState(props.dataa.visions_title_en)
  const [newVisionEn , setnewvisionEn] = useState(props.dataa.visions_en);
  const [ missionTitleEnErr , setMissionTitleEnErr] = useState('');
  const [ missionTitleArErr , setMissionTitleArErr] = useState('');
  const [ missionArErr , setMissionArErr] = useState('');
  const [ missionEnErr , setMissionEnErr] = useState('');
  const [ visionArErr , setvisionArErr] = useState('');
  const [ visionEnErr , setvisionEnErr] = useState('');
  const [ visionTitleEnErr , setvisionTitleEnErr] = useState('');
  const [ visionTitleArErr , setvisionTitleArErr] = useState('');

  const handleButton = () => {
    Swal.fire("Updated Successfully!", "You clicked the button!", "success");
};

  const handleUpdate = async(e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('missions_title_ar',newMissiontitleAr);
      data.append('missions_ar',newMissionAr);
      data.append('missions_title_en',newMissiontitleEn);
      data.append('missions_en',newMissionEn);
      data.append('visions_title_ar',newVisiontitleAr);
      data.append('visions_ar',newVisionAr);
      data.append('visions_title_en',newVisiontitleEn);
      data.append('visions_en',newVisionEn);
      try{
         await Axios.post(`http://localhost:8000/api/home/${props.idd}?_method=PUT` , data)
          .then((response)=>{
              console.log(response.data);
              setRender(prev => !prev);
              handleButton();

          })
      } catch (error) {
          if(error.response){
              setMissionTitleEnErr(error.response.data.errors.missions_title_en);
              setMissionTitleArErr(error.response.data.errors.missions_title_ar);
              setMissionArErr(error.response.data.errors.missions_ar);
              setMissionEnErr(error.response.data.errors.missions_en);
              setvisionArErr(error.response.data.errors.visions_ar);
              setvisionEnErr(error.response.data.errors.visions_en);
              setvisionTitleEnErr(error.response.data.errors.visions_title_en);
              setvisionTitleArErr(error.response.data.errors.visions_title_ar); 
          }

      }
  }



  return (
    <div style={{display:"grid" , gridTemplateColumns:"1fr"}} className="sessionmodal" >
               <form className="Signup-form">
           {missionTitleEnErr ? <div style={{ color: "red" }}>{missionTitleEnErr}</div> : ""}
            <input value={newMissiontitleEn} type="text" placeholder="new english mission title" onChange={(e)=>{
                setnewMissionTitleEn(e.target.value);
            }}/>
            

            {missionEnErr ? <div style={{ color: "red" }}>{missionEnErr}</div> : ""}
            <textarea value={newMissionEn} placeholder="new english mission paragraph" onChange={(e)=>{
                setnewMissionEn(e.target.value);
            }}></textarea>
<hr></hr>
<hr></hr> 
            
            {missionTitleArErr ? <div style={{ color: "red" }}>{missionTitleArErr}</div> : ""}
            <input value={newMissiontitleAr} type="text" placeholder="new Arabic mission title" onChange={(e)=>{
                setnewMissionTitleAr(e.target.value);
            }}/>

            {missionArErr ? <div style={{ color: "red" }}>{missionArErr}</div> : ""}
            <textarea value={newMissionAr} placeholder="new Arabic mission paragraph" onChange={(e)=>{
                setnewMissionAr(e.target.value);
            }}></textarea>
            <hr></hr>
            <hr></hr>
                  
            {visionTitleEnErr ? <div style={{ color: "red" }}>{visionTitleEnErr}</div> : "" }
            <input value={newVisiontitleEn} type="text" placeholder="new english vision title" onChange={(e)=>{
                setnewvisionTitleEn(e.target.value);
            }}/>
                

            {visionEnErr ? <div style={{ color: "red" }}>{visionEnErr}</div> : "" }
            <textarea value={newVisionEn} placeholder="new english vision paragraph" onChange={(e)=>{
                setnewvisionEn(e.target.value);
            }}></textarea>
            <hr></hr>
            <hr></hr>

            {visionTitleArErr ? <div style={{ color: "red" }}>{visionTitleArErr}</div> : "" }
            <input value={newVisiontitleAr} type="text" placeholder="new Arabic vision title" onChange={(e)=>{
                setnewvisionTitleAr(e.target.value);
            }}/>
            {visionArErr ?<div style={{ color: "red" }}>{visionArErr}</div> : "" }
            <textarea value={newVisionAr} placeholder="new Arabic vision paragraph" onChange={(e)=>{
                setnewvisionAr(e.target.value);
            }}></textarea>

           <div> <input type="submit" value="update" onClick={handleUpdate}/></div>
                            </form>
    </div>
  );
}
export default HomeUpdateModal;