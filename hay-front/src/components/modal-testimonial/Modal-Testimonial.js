import React from "react";

const ModalTestimonial = (props) => {
  return (
    <div className="modal fade" id="testimonial-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image">
              <img
                style={{ height: "200px", width: "200px" }}
                src={"http://localhost:8000/storage/" + props.testimonial.image}
                alt="testimonial-image"
              />
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
