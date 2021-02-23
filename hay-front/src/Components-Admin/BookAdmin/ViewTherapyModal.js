import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Avatar from '../../images/groupavatar.jpeg'
import confirm, { Button, alert } from "react-alert-confirm";

// The element to be shown in the modal window

function UpdateSessionModal(props) {
  const {setRender} = props.renderr;
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [lengthErr , setLengthErr] = useState('')

  const handleDelete = (id) => {
    if(props.leng < 2){
      setLengthErr('You cannot delete this Group! You will lose all your data')
    }else{
      confirm({
        lang: 'en',
        content: <h3>Are you sure you want to delete?</h3>,
        onOk: () => {
    try{
      Axios.delete(`http://localhost:8000/api/group-therapy/${props.dataa.id}`)
      .then((response)=>{
        console.log(response.data);
        setRender(prev => !prev);
      })
      }catch(err){console.log(err)}
  }})}}


  return (
    <div className="sessionmodal" style={{ padding: "10%" }} >
      <p><span style={{ fontWeight: "bold" }}>English Title :</span>{props.dataa.title_en}</p>
      <p><span style={{ fontWeight: "bold" }}>Arabic Title :</span>{props.dataa.title_ar}</p>
      {props.dataa.image === "empty" ? (
        <img style={{ width: "30%" }} src={Avatar} alt="error_profile" />
      ) : (
          <img style={{ width: "30%" }}
            src={`http://localhost:8000/storage/${props.dataa.image}`}
            alt="error_profile"
          />
        )}
      <p><span style={{ fontWeight: "bold" }}>English Description :</span>{props.dataa.description_en}</p>
      <p><span style={{ fontWeight: "bold" }}>Arabic Description :</span>{props.dataa.description_ar}</p>
        <div style={{color:"red"}}>{lengthErr}</div>
        <input type="submit" value="delete" style={{backgroundColor:"red" , padding:"2%"}} onClick={()=>handleDelete(props.dataa.id)}/>
    </div>
  );
}
export default UpdateSessionModal;