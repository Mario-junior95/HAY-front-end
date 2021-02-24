import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import "./Events.css";
import ModalWebinar from "../modal-webinar/Modal-Webinar";
import ModalTestimonial from "../modal-testimonial/Modal-Testimonial";
import Avatar from "../../images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faTags,
  faAngleRight,
  faSquareFull,
  faQuoteRight,
  faQuoteLeft,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Events = () => {
  const [language, setLanguage] = useState(false);
  const [data, setData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [imageLanguage, setImageLanguage] = useState(false);
  const [webinar, setWebinar] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
  });
  const [testimonial, setTestimonial] = useState({
    title: "",
    description: "",
    image: "null",
    date: "",
    type: "",
  });
  const passTestimonialData = (testimonial) => {
    setTestimonial({
      title: testimonial.title_en,
      description: testimonial.description_en,
      image: testimonial.image,
      date: testimonial.date,
      type: testimonial.type_en,
    });
  };
  const passData = (webinar) => {
    setWebinar({
      id: webinar.id,
      title: webinar.title_en,
      description: webinar.description_en,
      image: webinar.image,
      date: webinar.date,
      time: webinar.time,
    });
  };
  useEffect(async () => {
    const response = await fetch("http://localhost:8000/api/webinar");
    const webinars = await response.json();
    setData(webinars);
  }, []);
  useEffect(async () => {
    const response = await fetch("http://localhost:8000/api/testimonial");
    const testimonials = await response.json();
    setTestimonialData(testimonials);
  }, []);
  return (
    <div className="event-page">
      <Navigation />
      <div
            className="events-banner"
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
        { imageLanguage === true ?  <h1 style={{ paddingTop: "14%", fontSize:"25px" }} className="title">Our up-coming events and sessions <br></br>are here to help with your mental health.</h1> : <h1 style={{ paddingTop: "14%" , fontSize:"25px" }} className="title">تعرف على فعالياتنا وأنشطتنا <br></br>القادمة لمساعدتك في تحسين صحتك النفسية</h1>  }

          </div>
      
      <div className="event-wrapper">
        <div className="event">
          <span style={{ color: "black" }}>Ar</span>{" "}
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => {
                setLanguage(e.target.checked);
              }}
            />
            <span className="slider round"></span>
          </label>
          <span style={{ color: "black" }}>En</span>
          <div className="event-type">
            {data.reverse().map((webinar) => {
              let descWebinarEn =
                JSON.stringify(webinar.description_en).slice(1, 50) + "...";
              let descWebinarAr =
                JSON.stringify(webinar.description_ar).slice(1, 50) + "...";
              return (
                <div className="event-card" key={webinar.id}>
                  <div className="event-card-wrapper" style={{borderRadius:"25px"}}>
                    <div className="image" >
                      <img
                        src={"http://localhost:8000/storage/" + webinar.image}
                        alt="event-image"
                      />
                    </div>
                    <div className="event-info">
                      {language ? (
                        <h3 className="event-title left">{webinar.title_en}</h3>
                      ) : (
                        <h3 className="event-title right lalezar">
                          {webinar.title_ar}
                        </h3>
                      )}
                      {language ? (
                        <div className="event-date left">{webinar.date}</div>
                      ) : (
                        <div className="event-date right lalezar">
                          {webinar.date}
                        </div>
                      )}
                      {language ? (
                        <ul className="event-list">
                          <li>
                            <FontAwesomeIcon
                              icon={faClock}
                              className="event-icon"
                            />
                            Time: <strong>{webinar.time}</strong>
                          </li>
                          <li>
                            <FontAwesomeIcon
                              icon={faTags}
                              className="event-icon"
                            />
                            <span>Free</span>
                          </li>
                        </ul>
                      ) : (
                        <ul
                          className="event-list lalezar"
                          style={{ flexDirection: "row-reverse" }}
                        >
                          <li className="first-child-right">
                            التوقيت : <strong>{webinar.time}</strong>
                            <FontAwesomeIcon
                              icon={faClock}
                              className="event-icon event-icon-right"
                            />
                          </li>
                          <li>
                            <span>مجاني </span>
                            <FontAwesomeIcon
                              icon={faTags}
                              className="event-icon event-icon-right"
                            />
                          </li>
                        </ul>
                      )}
                      {language ? (
                        <div className="event-desc left">
                          <p>{descWebinarEn}</p>
                        </div>
                      ) : (
                        <div className="event-desc right lalezar">
                          <p>{descWebinarAr}</p>
                        </div>
                      )}
                      {language ? (
                        <div className="event-front-button left">
                          <button
                            onClick={() => {
                              passData(webinar);
                            }}
                            data-toggle="modal"
                            data-target="#webinar-modal"
                          >
                            Read more
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="event-icon"
                              style={{
                                marginLeft: "2em",
                              }}
                            />
                          </button>
                        </div>
                      ) : (
                        <div className="event-front-button right lalezar">
                          <button
                            onClick={() => {
                              passData(webinar);
                            }}
                            data-toggle="modal"
                            data-target="#webinar-modal"
                          >
                            <FontAwesomeIcon
                              icon={faAngleLeft}
                              className="event-icon"
                              style={{
                                marginRight: "2em",
                              }}
                            />
                            إقرأ أكثر
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="testimonial-section-title">
          <div className="testimonial-section-title-inner">
            <span>Client's Testimonial</span>
            <h2>What People Say !</h2>
            <FontAwesomeIcon icon={faSquareFull} className="square-icon" />
          </div>
        </div>
        <div className="event" >
          <div className="event-type event-testimonial" >
            {testimonialData.map((testimonial) => {
              let descTestimonialEn =
                JSON.stringify(testimonial.description_en).slice(1, 100) +
                "...";
              let descTestimonialAr =
                JSON.stringify(testimonial.description_ar).slice(1, 100) +
                " ...";
              return (
                <div className="event-card"  key={testimonial.id}>
                  <div className="event-card-wrapper" style={{borderRadius:"25px"}}>
                    <div className="image-testimonial">
                      {testimonial.image !== "null" ? (
                        <img
                          src={
                            "http://localhost:8000/storage/" + testimonial.image
                          }
                          alt="event-image"
                        />
                      ) : (
                        <img src={Avatar} alt="testimonial-image" />
                      )}
                    </div>
                    {language ? (
                      <div className="testimonial-info">
                        <h2>{testimonial.title_en}</h2>
                        <p>{testimonial.type_en}</p>
                      </div>
                    ) : (
                      <div className="testimonial-info">
                        <h2>{testimonial.title_ar}</h2>
                        <p>{testimonial.type_ar}</p>
                      </div>
                    )}

                    {language ? (
                      <div className="testimonial-description">
                        <p>
                          <em>
                            <FontAwesomeIcon
                              icon={faQuoteLeft}
                              className="quote-icon quote-icon-left"
                            />
                            {descTestimonialEn}
                            <FontAwesomeIcon
                              icon={faQuoteRight}
                              className="quote-icon quote-icon-right"
                            />
                          </em>
                        </p>
                      </div>
                    ) : (
                      <div className="testimonial-description right">
                        <p
                          className="right"
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faQuoteRight}
                            className="quote-icon"
                            style={{ marginTop: "-15px" }}
                          />
                          <div className="right">
                            {descTestimonialAr}
                            <span>
                              <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="quote-icon"
                                style={{ marginBottom: "-20px" }}
                              />
                            </span>
                          </div>
                        </p>
                      </div>
                    )}
                    {language ? (
                      <div className="testimonial-button">
                        <button
                          onClick={() => {
                            passTestimonialData(testimonial);
                          }}
                          data-toggle="modal"
                          data-target="#testimonial-modal"
                        >
                          Read more
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="event-icon"
                            style={{
                              marginLeft: "2em",
                            }}
                          />
                        </button>
                      </div>
                    ) : (
                      <div className="testimonial-button right lalezar">
                        <button
                          onClick={() => {
                            passTestimonialData(testimonial);
                          }}
                          data-toggle="modal"
                          data-target="#testimonial-modal"
                        >
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="event-icon"
                            style={{
                              marginRight: "2em",
                            }}
                          />
                          إقرأ أكثر
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ModalWebinar webinar={webinar} display={"block"} />
        <ModalTestimonial testimonial={testimonial} />
      </div>
    </div>
  );
};

export default Events;
