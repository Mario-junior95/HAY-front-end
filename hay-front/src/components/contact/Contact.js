import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import "./Contact.css";
import Logo from "../Imagesss/logo.svg";
import Fb from "../Imagesss/fb.png";
import Ig from "../Imagesss/ig.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [nameStatus, setNameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [imageLanguage, setImageLanguage] = useState(false);


  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", number);
    formData.append("message", message);

    let response = await fetch("http://localhost:8000/api/contact", {
      method: "POST",
      body: formData,
    });

    let data = await response.json();
    console.log(data);

    if (data.phone_number) {
      setPhone(data.phone_number[0]);
    } else {
      setPhone("");
    }
    if (data.name) {
      setNameStatus(data.name[0]);
    } else {
      setNameStatus("");
    }
    if (data.email) {
      setEmailStatus(data.email[0]);
    } else {
      setEmailStatus("");
    }
    if (data.message) {
      setMessageStatus(data.message[0]);
    } else {
      setMessageStatus("");
    }
    if (data.status) {
      setStatus(data.status);
      setEmail("");
      setNumber("");
      setName("");
      setMessage("");
    }
    setTimeout(() => {
      setStatus("");
    }, 2000);
  };
  return (
    <div>
      <Navigation />

      <div className="join__us__contact">
        <div className="contact-banner">
          <div
            className="join__us__contact__title"
            style={{ paddingBottom: "26%" }}
          >
            {/* <h1 className="title____contact_front">Contact us</h1> */}
            <br />
          
            <span className="label3" style={{ color: "white" , position:"absolute" ,left:"46%" ,top:"48.7%" ,color:"white" }}>Ar</span>
        <label  style={{ position:"absolute",left:"48%" ,top:"47.7%"}} className="switch switch2">
          <input style={{  top:"45%"}}
            type="checkbox"
            onChange={(e) => {
              setImageLanguage(e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
        <span className="label5" style={{ color: "white" , position:"absolute" ,left:"54%" ,top:"48.7%" ,color:"white" }}>En</span>
        { imageLanguage === true ?  <h1 style={{ paddingTop: "14%", fontSize:"25px" }} className="title">Don't hesitate to contact us!</h1> : <h1 style={{ paddingTop: "14%" , fontSize:"25px" }} className="title">لا تتردد أبداً في التواصل معنا  للاستفسارات وفرص التعاون</h1>  }

          </div>
        </div>
        <img
          data-aos="fade-left"
          style={{ marginTop: "5%" }}
          className="contact__us__img"
          src={Logo}
          alt=""
          width="400px"
        />
        <div className="contact__form__container">
          <div data-aos="fade-right" className="contact__form__card">
            <div className="wavvez">
              <span style={{ "--i": 1 }}>C</span>
              <span style={{ "--i": 2 }}>o</span>
              <span style={{ "--i": 3 }}>n</span>
              <span style={{ "--i": 4 }}>t</span>
              <span style={{ "--i": 5 }}>a</span>
              <span style={{ "--i": 6 }}>c</span>
              <span style={{ "--i": 7 }}>t</span>&nbsp;&nbsp;
              <span style={{ "--i": 8 }}>U</span>
              <span style={{ "--i": 9 }}>s</span>
            </div>
            <p>{status}</p>
            <p style={{ color: "red" }}>{nameStatus}</p>
            <input
              className="global____inputs___contact"
              type="texts"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p style={{ color: "red" }}>{emailStatus}</p>
            <input
              className="global____inputs___contact"
              type="emails"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: "red" }}>{phone}</p>
            <input
              className="global____inputs___contact"
              type="number"
              value={number}
              placeholder="Phone number"
              required
              onChange={(e) => setNumber(e.target.value)}
            />
            <p style={{ color: "red" }}>{messageStatus}</p>
            <textarea
              className="global___textarea_________contact"
              placeholder="Message"
              style={{ borderRadius: "25px" }}
              value={message}
              cols="26"
              rows="5"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              // id="signin"
              style={{ borderRadius: "15px", width: "30%" }}
              className="contact__form__btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
          <div data-aos="fade-left" className="contact__form__links">
            <div className="links">
              {/*
              <a
                href="https://www.facebook.com/HAYHowAreYouu/"
                target="__blank"
              >
                <img src={Fb} alt="" width="50px" />
              </a>
              <a
                href="https://www.instagram.com/hayhowareyouu/"
                target="__blank"
              >
                <img src={Ig} alt="" width="40px" />
            </a>*/}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
