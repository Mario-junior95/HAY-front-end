import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import ProfileModal from "./ProfileModal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Logo from '../../Images/circleLogo.png'
import Sidenav from "./Sidenav";
import confirm, { Button, alert } from "react-alert-confirm";


const Navigation = () => {
  const [token, setToken] = useState('');
  const [render, setRender] = useState(false)


  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [render, token])

  const handleLogout = (e) => {
    e.preventDefault();
    confirm({
      lang: 'en',
      content: <h3>Are you sure you want to logout?</h3>,
      onOk: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('education');
    localStorage.removeItem('interests');
    localStorage.removeItem('occupation');
    localStorage.removeItem('image');
    localStorage.removeItem('id');


    setRender(prev => !prev);
    console.log('logged out Successfully')
  }})}



  return (
    <div id="container">
      <div className="row">
        <div className="col-md-3"><img id="logo" style={{width:"25%" , zIndex:"10"}} src={Logo} alt="logo" /></div>
        <div className="col-md-6">
          <nav className="main-nav">
            <Link className="v" to="/">Home</Link>
            <Link className="a" to="/Book">Book</Link>
            <Link to="/Events">Events</Link>
            <Link className="d" to="/Blog">Blog</Link>
            <Link className="b" to="/Contact">Contact</Link>
          </nav>
          <Sidenav/>
        </div>
        <div id="nav-buttons" className="col-md-3">
          {token ? <button style={{width:"80px" , borderRadius:"8px" , marginLeft:"35%"}} id="logout" onClick={handleLogout}>Logout</button> : <form className="signform">
            <button type="button" id="signin" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1">Sign In</button>

            <button type="button" id="signup" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Sign Up</button>
          </form>
          }
          {token ? 
            <button type="button" style={{marginRight:"5%"}} id="logout" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
            </button>
          
           
           : ""}

        </div>

      </div>
      <ProfileModal render={{ setRender }} />
      <SignUp />
      <SignIn render={{ setRender }} />
    </div>
  );
};

export default Navigation;
