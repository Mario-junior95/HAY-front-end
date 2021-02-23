import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import ViewUserBookedTrans from "./ViewUserBookedTrans";
// The element to be shown in the modal window

function ViewBookedSessionsModal(props) {


    const dialog = useDialog();
    const [value, setValue] = useState();
    const [session , setSession] = useState([]);
    const [render , setRender] = useState(false);

useEffect(() => {
    Axios.get('http://localhost:8000/api/usersession')
    .then((response)=>{
        setSession(response.data.usersession)
    })
}, [render])

const handleDelete = (id) => {
    try{
        Axios.delete(`http://localhost:8000/api/usersession/${id}`)
        .then((response)=>{
            console.log(response.data)
            setRender(prev => !prev);
        })
    }catch(err){console.log(err)}
}


    return (
        <div style={{display:"grid" , gridTemplateColumns:"1fr 1fr 1fr"}} className="sessionmodal" >
        {session.reverse().map((val)=>{
            let created = JSON.stringify(val.created_at).slice(1,11);
            let created1 = JSON.stringify(val.created_at).slice(12,20);


            console.log(created)
            return <div style={{border:"1px black solid", backgroundColor:"white",marginTop:"1%"}} key={val.id}>
                    <p><span style={{fontWeight:"bold"}}>Ticket number: </span>{val.id}</p>
                     {val.user && val.user.map((arr)=>{
                       return <div key={arr.id}>
                           <div ><span style={{fontWeight:"bold"}}>Booking User : </span>{arr.name}</div>
                              <ViewUserBookedTrans data={arr}/>
                       </div>
                   })} 
                   {val.session && val.session.map((arr)=>{
                       return <div key={arr.id}>
                           <div><span style={{fontWeight:"bold"}}>Booked Session: </span>{arr.name_en}</div>

                       </div>
                   })}
                  <p><span style={{fontWeight:"bold"}}> Booked at : </span>{val.time.time}</p>
                        <p>{created} at {created1}</p>
                        <input type="submit" value="delete" style={{padding:"3%",fontSize:"12px",backgroundColor:"red"}} onClick={()=>handleDelete(val.id)}/>
                      </div>
                     
        })}
        </div>
    );
}
export default ViewBookedSessionsModal;