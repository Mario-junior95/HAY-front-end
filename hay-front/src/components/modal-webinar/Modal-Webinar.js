import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ModalWebinar = (props) => {
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("id");
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire("oops!", "You need to sign in before!", "warning");
    } else {
      const form = new FormData();
      form.append("user_id", user);
      form.append("webinar_id", props.webinar.id);
      try {
        await axios
          .post("http://localhost:8000/api/user-event", form, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            Swal.fire(
              "Registration Compeleted Successfully",
              "Thank you for Registering for our Webinar !",
              "success"
            );
          });
      } catch (error) {
        Swal.fire(
          "You Are Already Registered In This Webinar !! !!",
          "You Cannot Register More Than Once !",
          "warning"
        );
      }
    }
  };
  return (
    <div className="modal fade" id="webinar-modal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image">
              <img
                src={"http://localhost:8000/storage/" + props.webinar.image}
                alt="webinar-image"
              />
            </div>
            <h2>{props.webinar.title}</h2>
            <div>
              <p>{props.webinar.date}</p>
            </div>
            <div>
              <p>{props.webinar.time}</p>
            </div>

            <p>{props.webinar.description}</p>
            <p>{error}</p>
          </div>
          <div className="modal-footer">
            <button
              className="event-button"
              style={{ display: props.display }}
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={() => setError("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWebinar;
