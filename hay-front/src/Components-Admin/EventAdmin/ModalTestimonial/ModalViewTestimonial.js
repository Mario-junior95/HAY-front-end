import React from "react";
import Avatar from "../../../images/avatar.png";

const ModalViewTestimonial = (props) => {
  return (
    <div className="modal fade" id="testimonial-view-modal" role="dialog">
      <div className="modal-dialog modal-lg">
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
            <div>
              <div className="left user-admin-panel">
                <span>English Title: </span> {props.testimonial.title}
              </div>
              <div className="left user-admin-panel">
                <span>Arabic Title: </span> {props.testimonial.title_ar}
              </div>
              <div className="left user-admin-panel">
                <span>Date: </span>
                {props.testimonial.date}
              </div>
              <div className="left user-admin-panel">
                <span>English Description: </span>
                {props.testimonial.description}
              </div>
              <div className="left user-admin-panel">
                <span>Arabic Description: </span>
                {props.testimonial.description_ar}
              </div>
              <div className="left user-admin-panel">
                <span>English Type: </span>
                {props.testimonial.type}
              </div>
              <div className="left user-admin-panel">
                <span>Arabic Type: </span>
                {props.testimonial.type_ar}
              </div>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                type="button"
                className="event-button"
                data-dismiss="modal"
                value="close"
                style={{ width: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewTestimonial;
