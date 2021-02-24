import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalEditWebinar = (props) => {
  const { setRenderWebinar } = props.Render;

  const editWebinar = async (e, id) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title_en", e.target.title_en.value);
    body.append("title_ar", e.target.title_ar.value);
    body.append("description_en", e.target.description_en.value);
    body.append("description_ar", e.target.description_ar.value);
    body.append("date", e.target.date.value);
    body.append("time", e.target.time.value);
    if (e.target.image.files[0]) {
      body.append("image", e.target.image.files[0]);
    }
    try {
      await axios
        .post(`http://localhost:8000/api/webinar/${id}?_method=PUT`, body, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        })
        .then(() => {
          setRenderWebinar((prev) => !prev);
          Swal.fire({
            title: "Updated Successfully",
            text: "Your Webinar Is Updated!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal fade" id="webinar-edit-modal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="event-header">Edit Current Webinar</h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={props.show}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => editWebinar(e, props.webinar.id)}>
              <label className="event-label">English Title</label>
              <textarea
                rows="4"
                cols="48"
                name="title_en"
                id="title_en"
                className="event-textarea"
                placeholder="English Title "
                defaultValue={props.webinar.title}
              />
              <br />
              <br />
              <label className="event-label">Arabic Title</label>
              <textarea
                rows="4"
                cols="48"
                name="title_ar"
                id="title_ar"
                className="event-textarea"
                placeholder="Arabic Title "
                defaultValue={props.webinar.title_ar}
              />
              <br />
              <br />
              <label className="event-label">English Description</label>
              <textarea
                rows="4"
                cols="48"
                name="description_en"
                id="description_en"
                className="event-textarea"
                placeholder="English description"
                defaultValue={props.webinar.description}
              />
              <br />
              <br />
              <label className="event-label">Arabic Description</label>
              <textarea
                rows="4"
                cols="48"
                name="description_ar"
                id="description_ar"
                className="event-textarea"
                placeholder="Arabic description"
                defaultValue={props.webinar.description_ar}
              />
              <br />

              <input type="file" name="image" id="image" />
              <br />

              <input
                type="date"
                name="date"
                id="date"
                defaultValue={props.webinar.date}
              />
              <br />

              <input
                type="time"
                name="time"
                id="time"
                defaultValue={props.webinar.time}
              />
              <br />
              <input type="submit" value="update" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditWebinar;
