import React from "react";

const ModalViewWebinar = (props) => {
  return (
    <div className="modal fade" id="webinar-view-modal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image">
              <img
                src={"http://localhost:8000/storage/" + props.webinar.image}
                alt="webinar-image"
              />
            </div>
            <div>
              <div className="left user-admin-panel">
                <span>English Title: </span> {props.webinar.title}
              </div>
              <div className="left user-admin-panel">
                <span>Arabic Title: </span> {props.webinar.title_ar}
              </div>
              <div className="left user-admin-panel">
                <span>Date: </span>
                {props.webinar.date}
              </div>
              <div className="left user-admin-panel">
                <span>Time: </span>
                {props.webinar.time}
              </div>
              <div className="left user-admin-panel">
                <span>English Description: </span>
                {props.webinar.description}
              </div>
              <div className="left user-admin-panel">
                <span>Arabic Description: </span>
                {props.webinar.description_ar}
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

export default ModalViewWebinar;
