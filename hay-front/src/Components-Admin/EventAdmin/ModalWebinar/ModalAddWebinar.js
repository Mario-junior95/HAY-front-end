import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalAddWebinar = (props) => {
  const { setRenderWebinar } = props.Render;

  const [titleErr, setTitleErr] = useState("");
  const [titleEnglishErr, setTitleEnglishErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [descriptionEnglishErr, setDescriptionEnglishErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [timeErr, setTimeErr] = useState("");

  const addWebinar = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title_en", e.target.title_en.value);
    body.append("title_ar", e.target.title_ar.value);
    body.append("description_en", e.target.description_en.value);
    body.append("description_ar", e.target.description_ar.value);
    body.append("date", e.target.date.value);
    body.append("time", e.target.time.value);
    body.append("image", e.target.image.files[0]);
    try {
      await axios.post("http://localhost:8000/api/webinar", body).then(() => {
        setRenderWebinar((prev) => !prev);
        Swal.fire({
          title: "Added Successfully",
          text: "New Webinar Is Added!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ok",
        });
      });
    } catch (error) {
      if (error.response) {
        setTitleErr(error.response.data.errors.title_ar);
        setTitleEnglishErr(error.response.data.errors.title_en);
        setDescriptionErr(error.response.data.errors.description_ar);
        setDescriptionEnglishErr(error.response.data.errors.description_en);
        setDateErr(error.response.data.errors.date);
        setTimeErr(error.response.data.errors.time);
        setImageErr(error.response.data.errors.image);
      }
    }
  };
  return (
    <div className="modal fade " id="webinar-add-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="event-header">Add New Webinar</h2>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={props.show}
            >
              &times;
            </button>
          </div>
          <div className="modal-body event-modal">
            <form onSubmit={(e) => addWebinar(e)}>
              <label htmlFor="title_en">English Title</label>
              <br />
              <textarea
                name="title_en"
                id="title_en"
                placeholder="type your webinar English title here "
              />
              <br />
              <span style={{ color: "red" }}>{titleEnglishErr}</span>
              <br />
              <label htmlFor="title_a">Arabic Title</label>
              <br />
              <textarea
                name="title_ar"
                id="title_ar"
                placeholder="type your webinar Arabic title here "
              />
              <br />
              <span style={{ color: "red" }}>{titleErr}</span>
              <br />
              <label htmlFor="description_en">English Description</label>
              <br />
              <textarea
                name="description_en"
                id="description_en"
                placeholder="type your webinar English description here"
              />
              <br />
              <span style={{ color: "red" }}>{descriptionEnglishErr}</span>
              <br />
              <label htmlFor="description_ar">Arabic Description</label>
              <br />
              <textarea
                name="description_ar"
                id="description_ar"
                placeholder="type your webinar Arabic description here"
              />
              <br />
              <span style={{ color: "red" }}>{descriptionErr}</span>
              <br />
              <label htmlFor="image">Image</label>
              <br />
              <input type="file" name="image" id="image" />
              <br />
              <span style={{ color: "red" }}>{imageErr}</span>
              <br />
              <label htmlFor="date">choose Webinar Date</label>
              <br />
              <input type="date" name="date" id="date" />
              <br />
              <span style={{ color: "red" }}>{dateErr}</span>
              <br />
              <label htmlFor="time">choose Webinar Time</label>
              <br />
              <input type="time" name="time" id="time" />
              <br />
              <span style={{ color: "red" }}>{timeErr}</span>
              <br />
              <input type="submit" value="Create" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddWebinar;
