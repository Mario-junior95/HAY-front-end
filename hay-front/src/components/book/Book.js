import React, { useState, useEffect, useContext } from "react";
import Navigation from "../navigation/Navigation";
import Axios from 'axios';
import './Book.css';
import { AppContext } from '../../Helper/Context';
import TherapyTransport from "./TherapyTransport";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../Footer/Footer";

AOS.init();
const Book = () => {
  const [therapy, setTherapy] = useState([]);
  const [ language, setLanguage ] = useState(false);
  const [length , setLength] = useState([])
  const [session , setSession] = useState([]);
  


  useEffect(() => {
    Axios.get('http://localhost:8000/api/group-therapy')
      .then((response) => {
        setTherapy(response.data.therapy);
        AOS.init({
          duration : 3000
        }) })
  }, [])

  useEffect(() => {
    Axios.get('http://localhost:8000/api/user-therapy')
      .then((response) => {
        setLength(response.data.session.length)
        setSession(response.data.session)
      })
  }, [])

  
  return (
    <div style={{paddingBottom:"10%" , position:"relative"}}>
      <div className="booksession">
      <Navigation />
      <div>
 
        </div>
        <h1 style={{paddingTop:"10%" , fontSize:"40px"}} className="title">Book a Session</h1>
        <h1 style={{fontSize:"40px"}} className="titletwo">We Rise By Lifting Others</h1>
        <div style={{width:"30%",margin:"0 auto" , display:"flex" ,justifyContent:"space-around" , paddingBottom:"20%"}}>
       
       </div>
      </div>
      Ar <label className="switch">
 <input type="checkbox" onChange={(e)=>{
    setLanguage(e.target.checked)
  }}/>
  <span className="slider round"></span>
        </label>En
      <div style={{display:"grid" , gridTemplateColumns:"1fr"}}>
      <h2 data-aos="fade-right" id="group-therapyy" style={{color:"black" ,position:"absolute" , left:"22%" , fontWeight:"500"}}>
      <div className="wavve">
      <span style={{"--i":1}}>G</span>
      <span style={{"--i":2}}>r</span>
      <span style={{"--i":3}}>o</span>
      <span style={{"--i":4}}>u</span>
      <span style={{"--i":5}}>p</span>&nbsp;&nbsp;
      <span style={{"--i":6}}>T</span>
      <span style={{"--i":7}}>h</span>
      <span style={{"--i":8}}>e</span>
      <span style={{"--i":9}}>r</span>
      <span style={{"--i":10}}>a</span>
      <span style={{"--i":11}}>p</span>
      <span style={{"--i":12}}>y</span>
      </div>
         </h2>

      {therapy.map((val) => {
          return <div className="group-therapy" data-aos="fade-right" key={val.id}>
            <img src={`http://localhost:8000/storage/${val.image}`} alt="error" />
            <div style={{marginTop:"10%"}}>{language === true ? <span style={{color:"rgb(56, 52, 52)"  , fontSize:"25px"}}>{val.title_en}</span> : <span style={{color:"rgb(56, 52, 52)"  , fontSize:"25px"}}>{val.title_ar}</span>}</div>
            <div>{language === true ? <span>{val.description_en}</span> : <span>{val.description_ar}</span>}</div>
            <TherapyTransport session ={session} lang = {language}/>
            <span style={{marginTop:"5%"}} ><span style={{color:"red"}}>{length}</span> Session/s Available</span>
          </div>
        })}
      </div>
      <span style={{position:"absolute" , bottom:"-5%" , left:"0" , width:"100%"}}><Footer/></span>
    </div>
  );
};

export default Book;