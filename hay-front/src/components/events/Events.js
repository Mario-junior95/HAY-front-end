import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import "./Events.css";
import ModalWebinar from "../modal-webinar/Modal-Webinar";
import ModalTestimonial from "../modal-testimonial/Modal-Testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const Events = () => {
  const [data, setData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
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
    image: "",
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
      <div className="event-wrapper">
        <div className="event">
          <div className="event-webinar">
            {data.map((webinar) => {
              let descWebinarEn =
                JSON.stringify(webinar.description_en).slice(1, 50) + "...";
              let descWebunarAr =
                JSON.stringify(webinar.description_ar).slice(1, 50) + "...";
              return (
                <div className="event-card" key={webinar.id}>
                  <div className="event-card-wrapper">
                    <div className="image">
                      <img
                        src={"http://localhost:8000/storage/" + webinar.image}
                        alt="event-image"
                      />
                    </div>
                    <div className="event-info">
                      <h3 className="event-title">{webinar.title_en}</h3>
                      <span className="event-date">{webinar.date}</span>
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
                      <div className="event-desc left">
                        <p>{descWebinarEn}</p>
                      </div>
                      <div className="event-front-button left">
                        <button
                          onClick={() => {
                            passData(webinar);
                          }}
                          data-toggle="modal"
                          data-target="#webinar-modal"
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="event">
          <div className="event-testimonial">
            {testimonialData.map((testimonial) => {
              return (
                <div className="event-card" key={testimonial.id}>
                  <div className="image">
                    <img
                      src={"http://localhost:8000/storage/" + testimonial.image}
                      alt="testimonial-image"
                    />
                  </div>
                  <div>
                    <h2>{testimonial.title_en}</h2>
                    <p>{testimonial.date}</p>
                    <p>{testimonial.type_en}</p>
                  </div>

                  <div>
                    <p>{testimonial.description_en}</p>
                  </div>
                  <button
                    onClick={() => {
                      passTestimonialData(testimonial);
                    }}
                    data-toggle="modal"
                    data-target="#testimonial-modal"
                  >
                    Read more
                  </button>
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
