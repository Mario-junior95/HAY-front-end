import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalAddTestimonial = (props) => {
  const { setRenderTestimonial } = props.Render;

  const [titleErr, setTitleErr] = useState("");
  const [titleEnglishErr, setTitleEnglishErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [descriptionEnglishErr, setDescriptionEnglishErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const clear = () => {
    setTitleErr("");
    setTitleEnglishErr("");
    setDescriptionErr("");
    setDescriptionEnglishErr("");
    setDateErr("");
  };
  const addTestimonial = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title_en", e.target.title_en.value);
    body.append("title_ar", e.target.title_ar.value);
    body.append("description_en", e.target.description_en.value);
    body.append("description_ar", e.target.description_ar.value);
    body.append("date", e.target.date.value);
    body.append("type_en", e.target.type_en.value);
    body.append("type_ar", e.target.type_ar.value);
    body.append("image", e.target.image.files[0]);
    try {
      await axios
        .post("http://localhost:8000/api/testimonial", body, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        })
        .then(() => {
          setRenderTestimonial((prev) => !prev);
          Swal.fire({
            title: "Added Successfully",
            text: "New Testimonial Is Added !",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
          clear();
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setTitleErr(error.response.data.errors.title_ar);
        setTitleEnglishErr(error.response.data.errors.title_en);
        setDescriptionErr(error.response.data.errors.description_ar);
        setDescriptionEnglishErr(error.response.data.errors.description_en);
        setDateErr(error.response.data.errors.date);
        setImageErr(error.response.data.errors.image);
      }
    }
  };
  return (
    <div className="modal fade " id="testimonial-add-modal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="event-header">Add New Testimonial</h2>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={props.show}
              title="close"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => addTestimonial(e)}>
              <span style={{ color: "red" }}>{titleEnglishErr}</span>
              <textarea
                name="title_en"
                id="title_en"
                className="event-textarea"
                placeholder="type your testimonial English title here "
                rows="4"
                cols="48"
              />
              <br />

              <span style={{ color: "red" }}>{titleErr}</span>
              <textarea
                name="title_ar"
                id="title_ar"
                className="event-textarea"
                placeholder="type your testimonial Arabic title here "
                rows="4"
                cols="48"
              />
              <br />

              <span style={{ color: "red" }}>{descriptionEnglishErr}</span>
              <textarea
                name="description_en"
                id="description_en"
                className="event-textarea"
                placeholder="type your testimonial English description here"
                rows="4"
                cols="48"
              />
              <br />

              <span style={{ color: "red" }}>{descriptionErr}</span>
              <textarea
                name="description_ar"
                id="description_ar"
                className="event-textarea"
                placeholder="type your testimonial Arabic description here"
                rows="4"
                cols="48"
              />
              <br />

              <span style={{ color: "red" }}>{imageErr}</span>
              <input type="file" name="image" id="image" />
              <br />

              <span style={{ color: "red" }}>{dateErr}</span>
              <input type="date" name="date" id="date" />
              <br />

              <select
                name="type_en"
                id="type_en"
                className="testimonial-admin-type"
              >
                <option value="Professionals Testimonial ">
                  Professionals testimonial
                </option>
                <option value="Participants Testimonial">
                  Participants testimonial
                </option>
              </select>
              <br />

              <select
                name="type_ar"
                id="type_ar"
                className="testimonial-admin-type"
              >
                <option value="شهادة من اختصاصيين في الصحة النفسية">
                  شهادة من اختصاصيين في الصحة النفسية
                </option>
                <option value="شهادة من مشاركين في أنشطة وجلسات هاي">
                  شهادة من مشاركين في أنشطة وجلسات هاي
                </option>
              </select>
              <br />
              <input type="submit" value="create" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTestimonial;
