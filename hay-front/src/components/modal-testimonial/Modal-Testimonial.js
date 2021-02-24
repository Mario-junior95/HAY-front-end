import React from "react";
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
            <h2>{props.testimonial.title}</h2>
            <div>
              <p>{props.testimonial.date}</p>
            </div>
            <div>
              <p>{props.testimonial.type}</p>
            </div>

            <p>{props.testimonial.description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
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

export default ModalTestimonial;
