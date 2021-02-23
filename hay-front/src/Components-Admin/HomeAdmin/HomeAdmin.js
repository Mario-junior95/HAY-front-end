import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AddContent from './AddContent';
import HomeUpdateTrans from './HomeUpdateTrans';
import NavigationAdmin from '../NavigationAdmin/NavigationAdmin';
import ViewHomeTrans from './ViewHomeTrans';
import './HomeAdmin.css';

const HomeAdmin = () => {
    const [homeData, setHomeData] = useState([]);
    const [render, setRender] = useState(false);
    const [deleteErr, setDeleteErr] = useState('');


    useEffect(() => {
        Axios.get('http://localhost:8000/api/home')
            .then((response) => {
                setHomeData(response.data.home)
            })

    }, [render])

    const deleteData = (id) => {
        if (homeData.length <= 1) {
            setDeleteErr('You cannot delete this data because you wont have any data')
        } else {
            try {
                Axios.delete(`http://localhost:8000/api/home/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        setRender(prev => !prev);
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="container">
            <NavigationAdmin />
            <AddContent render={{ setRender }} />
            <button type="button" id="signup" style={{width:"20%" , marginRight:"85%"}} className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Content</button>
            <div style={{marginTop:"5%"}}>{deleteErr ? <div style={{ color: "red" }}>{deleteErr}</div> : <div style={{ display: "none" }}></div>}</div>
          
            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <h1>Home Page</h1>
            {homeData.map((val) => {
                return <div style={{ display: "grid",height:"100px" ,gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }} key={val.id}>
                    <h4 style={{marginTop:"32%" , fontWeight:"bold"}}>Missions/Visions</h4>
                    <span style={{marginTop:"5%", marginLeft:"25%" , height:"48px"}}><ViewHomeTrans data={val} /></span>
                    <div>
                    </div>
                    <HomeUpdateTrans render={{ setRender }} id={val.id} data={val} />


                    <input type="submit" style={{ backgroundColor: "red" , height:"48px" , marginTop:"17%" }} value="delete" onClick={() => deleteData(val.id)} />
            
                </div>
            })}
           <div style={{borderBottom:"2px green solid" , marginTop:"5%" }}></div>

           </div>

        </div>
    )
}

export default HomeAdmin;
