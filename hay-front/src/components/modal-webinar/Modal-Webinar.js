import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Modal-Webinar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faTags,
  faAngleRight,
  faAngleLeft,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";

const ModalWebinar = (props) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("id");
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire("oops!", "You need to sign in before!", "warning");
    } else {
      const form = new FormData();
      form.append("user_id", user);
      form.append("webinar_id", props.webinar.id);
      try {
        await axios
          .post("http://localhost:8000/api/user-event", form, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then(() => {
            Swal.fire(
              "Registration Compeleted Successfully",
              "Thank you for Registering for our Webinar !",
              "success"
            );
          });
      } catch (error) {
        Swal.fire(
          "You Are Already Registered In This Webinar !! !!",
          "You Cannot Register More Than Once !",
          "warning"
        );
      }
    }
  };
  return (
    <div className="modal fade" id="webinar-modal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image">
              <img
                src={"http://localhost:8000/storage/" + props.webinar.image}
                alt="webinar-image"
              />
            </div>
            <div className="event-info" style={{ padding: "2rem 0 0 " }}>
              {props.language ? (
                <h3 className="event-title left" style={{ fontSize: "25px" }}>
                  {props.webinar.title}
                </h3>
              ) : (
                <h3 className="event-title right " style={{ fontSize: "25px" }}>
                  {props.webinar.title_ar}
                </h3>
              )}
              {props.language ? (
                <div className="register-event-wrapper">
                  <div className="register-event">
                    <div
                      className="event-date left"
                      style={{ fontSize: "20px" }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarWeek}
                        className="event-icon"
                        style={{ fontSize: "20px" }}
                      />
                      Date: {props.webinar.date}
                    </div>

                    <ul className="event-list modal-event-list">
                      <li style={{ fontSize: "20px" }}>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="event-icon"
                          style={{ fontSize: "20px" }}
                        />
                        Time: <strong>{props.webinar.time}</strong>
                      </li>
                      <li style={{ fontSize: "20px" }}>
                        <FontAwesomeIcon
                          icon={faTags}
                          className="event-icon"
                          style={{ fontSize: "20px" }}
                        />
                        <span>Free</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="register-button-wrapper"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="event-front-button left"
                      style={{ height: "100%", marginTop: 0 }}
                    >
                      <button onClick={handleRegister}>
                        Register Now
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="event-icon modal-event-icon"
                          style={{
                            marginLeft: "2em",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="register-event-wrapper"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="register-event">
                    <div className="event-date right">
                      التاريخ :{props.webinar.date}
                      <FontAwesomeIcon
                        icon={faCalendarWeek}
                        className="event-icon event-icon-right"
                        style={{ fontSize: "20px" }}
                      />
                    </div>

                    <ul
                      className="event-list  modal-event-list"
                      style={{ flexDirection: "row-reverse" }}
                    >
                      <li
                        className="first-child-right"
                        style={{ fontSize: "20px" }}
                      >
                        التوقيت : <strong>{props.webinar.time}</strong>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="event-icon event-icon-right"
                          style={{ fontSize: "20px" }}
                        />
                      </li>
                      <li style={{ fontSize: "20px" }}>
                        <span>مجاني </span>
                        <FontAwesomeIcon
                          icon={faTags}
                          className="event-icon event-icon-right"
                          style={{ fontSize: "20px" }}
                        />
                      </li>
                    </ul>
                  </div>
                  <div
                    className="register-button-wrapper"
                    style={{ height: "100%" }}
                  >
                    <div className="event-front-button right ">
                      <button onClick={handleRegister}>
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          className="event-icon modal-event-icon"
                          style={{
                            marginRight: "2em",
                          }}
                        />
                        سجَل اﻵن
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {props.language ? (
                <div className="event-desc left" style={{ fontSize: "2rem" }}>
                  {props.webinar.description}
                </div>
              ) : (
                <div className="event-desc right " style={{ fontSize: "2rem" }}>
                  {props.webinar.description_ar}
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="event-close-button"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWebinar;
