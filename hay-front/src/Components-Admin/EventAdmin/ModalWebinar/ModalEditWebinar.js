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
        .post(`http://localhost:8000/api/webinar/${id}?_method=PUT`, body)
        .then(() => {
          setRenderWebinar((prev) => !prev);
          Swal.fire({
            title: "Updated Successfully",
            text: "Your Webinar Is Updated!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
          // .then((result) => {
          //   if (result.isConfirmed) {
          //     props.show();
          //   }
          // });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="webinar-edit-modal"
      role="dialog"
      // aria-hidden="false"
    >
      <div className="modal-dialog">
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
              <label htmlFor="title_en">English Title</label>
              <br />
              <textarea
                name="title_en"
                id="title_en"
                placeholder="type your webinar English title here "
                defaultValue={props.webinar.title_ar}
              />
              <br />
              <label htmlFor="title_a">Arabic Title</label>
              <br />
              <textarea
                name="title_ar"
                id="title_ar"
                placeholder="type your webinar Arabic title here "
                defaultValue={props.webinar.title}
              />
              <br />
              <label htmlFor="description_en">English Description</label>
              <br />
              <textarea
                name="description_en"
                id="description_en"
                placeholder="type your webinar English description here"
                defaultValue={props.webinar.description}
              />
              <br />
              <label htmlFor="description_ar">Arabic Description</label>
              <br />
              <textarea
                name="description_ar"
                id="description_ar"
                defaultValue={props.webinar.description_ar}
              />
              <br />
              <label htmlFor="image">Image</label>
              <br />
              <input type="file" name="image" id="image" />
              <br />
              <label htmlFor="date">Pick Webinar Date</label>
              <br />
              <input
                type="date"
                name="date"
                id="date"
                defaultValue={props.webinar.date}
              />
              <br />
              <label htmlFor="time">Pick Webinar Time</label>
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
