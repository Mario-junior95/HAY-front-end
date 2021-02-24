import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalEditTestimonial = (props) => {
  const { setRenderTestimonial } = props.Render;
  const editTestimonial = async (e, id) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title_en", e.target.title_en.value);
    body.append("title_ar", e.target.title_ar.value);
    body.append("description_en", e.target.description_en.value);
    body.append("description_ar", e.target.description_ar.value);
    body.append("date", e.target.date.value);
    body.append("type_en", e.target.type_en.value);
    body.append("type_ar", e.target.type_ar.value);
    if (e.target.image.files[0]) {
      body.append("image", e.target.image.files[0]);
    }
    try {
      await axios
        .post(`http://localhost:8000/api/testimonial/${id}?_method=PUT`, body, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        })
        .then((response) => {
          setRenderTestimonial((prev) => !prev);
          Swal.fire({
            title: "Updated Successfully",
            text: "Your testimonial is updated!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          });
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="testimonial-edit-modal"
      role="dialog"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="event-header">Edit Current Testimonial</h2>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={props.show}
            >
              &times;
            </button>
          </div>
          <div className="modal-bod</div>y">
            <form
              // onSubmit={(e) => props.editTestimonial(e, props.testimonial.id)}
              onSubmit={(e) => editTestimonial(e, props.testimonial.id)}
            >
              <label htmlFor="title_en">English Title</label>
              <br />
              <textarea
                name="title_en"
                id="title_en"
                className="event-textarea"
                placeholder="type your testimonial English title here "
                rows="4"
                cols="48"
                defaultValue={props.testimonial.title}
              />
              <br />
              <label htmlFor="title_a">Arabic Title</label>
              <br />
              <textarea
                name="title_ar"
                id="title_ar"
                className="event-textarea"
                placeholder="type your testimonial Arabic title here "
                defaultValue={props.testimonial.title_ar}
                rows="4"
                cols="48"
              />
              <br />
              <label htmlFor="description_en">English Description</label>
              <br />
              <textarea
                name="description_en"
                id="description_en"
                className="event-textarea"
                placeholder="type your testimonial English description here"
                defaultValue={props.testimonial.description}
                rows="4"
                cols="48"
              />
              <br />
              <label htmlFor="description_ar">Arabic Description</label>
              <br />
              <textarea
                name="description_ar"
                id="description_ar"
                className="event-textarea"
                defaultValue={props.testimonial.description_ar}
                rows="4"
                cols="48"
              />
              <br />
              <label htmlFor="image">Image</label>
              <br />
              <input type="file" name="image" id="image" />
              <br />
              <label htmlFor="date">Pick testimonial Date</label>
              <br />
              <input
                type="date"
                name="date"
                id="date"
                defaultValue={props.testimonial.date}
              />
              <br />
              <label htmlFor="type_en">Choose Testimonial English Type</label>
              <br />
              <select
                name="type_en"
                id="type_en"
                className="testimonial-admin-type"
                defaultValue={props.testimonial.type_en}
              >
                <option value="Professionals Testimonial ">
                  Professionals testimonial
                </option>
                <option value="Participants Testimonial">
                  Participants testimonial
                </option>
              </select>
              <br />
              <label htmlFor="type_ar">Choose Testimonial Arabic Type</label>
              <br />
              <select
                name="type_ar"
                id="type_ar"
                className="testimonial-admin-type"
                defaultValue={props.testimonial.type_ar}
              >
                <option value="شهادة من اختصاصيين في الصحة النفسية">
                  شهادة من اختصاصيين في الصحة النفسية
                </option>
                <option value="شهادة من مشاركين في أنشطة وجلسات هاي">
                  شهادة من مشاركين في أنشطة وجلسات هاي
                </option>
              </select>
              <br />
              <br />
              <input type="submit" value="update" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTestimonial;
