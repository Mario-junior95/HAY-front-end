import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../images/avatar.png";

const ModalTestimonial = (props) => {
  return (
    <div className="modal fade" id="testimonial-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image">
              {props.testimonial.image !== "null" ? (
                <img
                  style={{ height: "200px", width: "200px" }}
                  src={
                    "http://localhost:8000/storage/" + props.testimonial.image
                  }
                  alt="testimonial-image"
                />
              ) : (
                <img
                  src={Avatar}
                  style={{ height: "200px", width: "200px" }}
                  alt="avatar testimonial image"
                />
              )}
            </div>
            {props.language ? (
              <div className="testimonial-info">
                <h2>{props.testimonial.title}</h2>
                <p style={{ margin: "0px" }}>{props.testimonial.type}</p>
                <p>{props.testimonial.date}</p>
              </div>
            ) : (
              <div className="testimonial-info">
                <h2> {props.testimonial.title_ar}</h2>
                <p style={{ margin: "0px" }}>{props.testimonial.type_ar}</p>
                <p>{props.testimonial.date}</p>
              </div>
            )}
            {props.language ? (
              <div className="testimonial-description">
                <p>
                  <em>
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      className="quote-icon quote-icon-left"
                    />
                    {props.testimonial.description}
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
                    <em> {props.testimonial.description_ar}</em>
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
    </div>
  );
};

export default ModalTestimonial;
