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

  const clear = () => {
    setTitleErr("");
    setTitleEnglishErr("");
    setDescriptionErr("");
    setDescriptionEnglishErr("");
    setDateErr("");
    setImageErr("");
    setTimeErr("");
  };

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
      await axios
        .post("http://localhost:8000/api/webinar", body, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        })
        .then(() => {
          setRenderWebinar((prev) => !prev);
          Swal.fire({
            title: "Added Successfully",
            text: "New Webinar Is Added!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
          clear();
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
      <div className="modal-dialog modal-lg">
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
              <span style={{ color: "red" }}>{titleEnglishErr}</span>
              <br />
              <textarea
                rows="4"
                cols="48"
                name="title_en"
                id="title_en"
                className="event-textarea"
                placeholder=" English title "
              />

              <span style={{ color: "red" }}>{titleErr}</span>
              <br />
              <textarea
                name="title_ar"
                id="title_ar"
                className="event-textarea"
                placeholder="Arabic Title"
                rows="4"
                cols="48"
              />

              <span style={{ color: "red" }}>{descriptionEnglishErr}</span>
              <br />
              <textarea
                name="description_en"
                id="description_en"
                className="event-textarea"
                placeholder="English Description "
                rows="4"
                cols="48"
              />

              <span style={{ color: "red" }}>{descriptionErr}</span>
              <br />
              <textarea
                name="description_ar"
                id="description_ar"
                className="event-textarea"
                placeholder="Arabic Description"
                rows="4"
                cols="48"
              />

              <span style={{ color: "red" }}>{imageErr}</span>
              <br />
              <input type="file" name="image" id="image" />
              <br />
              <span style={{ color: "red" }}>{dateErr}</span>
              <br />
              <input type="date" name="date" id="date" />
              <br />
              <span style={{ color: "red" }}>{timeErr}</span>
              <br />
              <input type="time" name="time" id="time" />

              <input type="submit" value="Create" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddWebinar;
