import React, { useState, useEffect } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import ModalWebinar from "../../components/modal-webinar/Modal-Webinar";
import ModalAddWebinar from "./ModalWebinar/ModalAddWebinar";
import ModalEditWebinar from "./ModalWebinar/ModalEditWebinar";
import ModalTestimonial from "../../components/modal-testimonial/Modal-Testimonial";
import ModalAddTestimonial from "./ModalTestimonial/ModalAddTestimonial";
import ModalEditTestimonial from "./ModalTestimonial/ModalEditTestimonial";
import WebinarAttendeeViewButton from "./ModalWebinar/WebinarAttendeeViewButton";
import "./EventAdmin.css";
import Pagination from "../../Paginate/Paginate";
import axios from "axios";
import Swal from "sweetalert2";

const EventAdmin = () => {
  const [data, setData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [select, setSelect] = useState("webinar");
  const [renderWebinar, setRenderWebinar] = useState(false);
  const [renderTestimonial, setRenderTestimonial] = useState(false);
  const [showWebinarAdd, setShowWebinarAdd] = useState(false);
  const [showTestimonialAdd, setShowTestimonialAdd] = useState(false);
  const [showWebinarUpdate, setShowWebinarUpdate] = useState(false);
  const [showTestimonialUpdate, setShowTestimonialUpdate] = useState(false);

  const [webinar, setWebinar] = useState({
    id: "",
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    image: "",
    date: "",
    time: "",
  });
  const [testimonial, setTestimonial] = useState({
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    image: "",
    date: "",
    type: "",
    type_ar: "",
  });
  const passTestimonialData = (testimonial) => {
    setTestimonial({
      id: testimonial.id,
      title: testimonial.title_en,
      title_ar: testimonial.title_ar,
      description: testimonial.description_en,
      description_ar: testimonial.description_ar,
      image: testimonial.image,
      date: testimonial.date,
      type: testimonial.type_en,
      type_ar: testimonial.type_ar,
    });
  };
  const passData = (webinar) => {
    setWebinar({
      id: webinar.id,
      title: webinar.title_en,
      title_ar: webinar.title_ar,
      description: webinar.description_en,
      description_ar: webinar.description_ar,
      image: webinar.image,
      date: webinar.date,
      time: webinar.time,
    });
  };
  //    GET WEBINAR DATA
  useEffect(async () => {
    const response = await fetch("http://localhost:8000/api/webinar");
    const webinars = await response.json();
    setData(webinars);
  }, [renderWebinar]);

  //    GET TESTIMONIAL DATA
  useEffect(async () => {
    const response = await fetch("http://localhost:8000/api/testimonial");
    const testimonials = await response.json();
    setTestimonialData(testimonials);
  }, [renderTestimonial]);

  //    ON DELETE ALERT
  const deleteAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (select === "webinar") {
          deleteWebinar(id);
        } else {
          deleteTestimonial(id);
        }
      }
    });
  };
  //    DELETE WEBINAR
  const deleteWebinar = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/webinar/${id}`).then(() => {
        setRenderWebinar((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //    DELETE TESTIMONIAL
  const deleteTestimonial = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/testimonial/${id}`)
        .then(() => {
          setRenderTestimonial((prev) => !prev);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const currentTestimonialPosts = testimonialData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavigationAdmin />
      <div>
        <input
          type="button"
          className="event-button"
          data-toggle="modal"
          data-target="#webinar-add-modal"
          data-backdrop="static"
          data-keyboard="false"
          value="New Webinar"
          onClick={() => setShowWebinarAdd(!showWebinarAdd)}
        />
        <input
          type="button"
          className="event-button"
          data-toggle="modal"
          data-target="#testimonial-add-modal"
          data-backdrop="static"
          data-keyboard="false"
          value="New testimonial"
          onClick={() => setShowTestimonialAdd(!showTestimonialAdd)}
        />

        <h2>
          List of
          <select
            onChange={(e) => {
              setSelect(e.target.value);
            }}
            value={select}
          >
            <option value="webinar">webinar</option>
            <option value="testimonial">testimonial</option>
          </select>
        </h2>
      </div>
      <div className="table">
        <div>
          <div className="row1">
            <div className="col0 col3 grow-1">Title</div>
            <div className="col0 col3 grow-1">Date</div>
            <div className="actionTitle col0 col3 grow-2">Action</div>
          </div>
        </div>
        {select === "webinar" ? (
          <div>
            {currentPosts.map((webinar) => {
              return (
                <div className="row0 rowData" key={webinar.id}>
                  <div className="col0 col3 grow-1">{webinar.title_en} </div>
                  <div className="col0 col3 grow-1">{webinar.date}</div>
                  <div className="col0 col3 grow-2">
                    <div className="action">
                      <WebinarAttendeeViewButton
                        key={webinar.id}
                        listAttendees={webinar}
                      />
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => {
                          passData(webinar);
                        }}
                        data-toggle="modal"
                        data-target="#webinar-modal"
                        value="view"
                      />
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => {
                          setShowWebinarUpdate(!showWebinarUpdate);
                          passData(webinar);
                        }}
                        data-toggle="modal"
                        data-target="#webinar-edit-modal"
                        data-backdrop="static"
                        data-keyboard="false"
                        value="update"
                      />
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => deleteAlert(webinar.id)}
                        value="delete"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              paginate={paginate}
              postsPerPage={postsPerPage}
              totalPosts={data.length}
            />
          </div>
        ) : (
          <div>
            {currentTestimonialPosts.map((testimonial) => {
              return (
                <div className="row0 rowData" key={testimonial.id}>
                  <div className="col0 col3 grow-1">{testimonial.title_en}</div>
                  <div className="col0 col3 grow-1">{testimonial.date}</div>
                  <div className="col0 col3 grow-2">
                    <div className="action">
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => {
                          passTestimonialData(testimonial);
                        }}
                        data-toggle="modal"
                        data-target="#testimonial-modal"
                        value="view"
                      />
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => {
                          setShowTestimonialUpdate(!showTestimonialUpdate);
                          passTestimonialData(testimonial);
                        }}
                        data-toggle="modal"
                        data-target="#testimonial-edit-modal"
                        data-backdrop="static"
                        data-keyboard="false"
                        value="update"
                      />
                      <input
                        type="button"
                        className="event-button"
                        onClick={() => deleteAlert(testimonial.id)}
                        value="delete"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              paginate={paginate}
              postsPerPage={postsPerPage}
              totalPosts={testimonialData.length}
            />
          </div>
        )}
      </div>
      <ModalWebinar webinar={webinar} display={"none"} />
      {showWebinarAdd && (
        <ModalAddWebinar
          show={() => setShowWebinarAdd(!showWebinarAdd)}
          Render={{ setRenderWebinar }}
        />
      )}
      {showWebinarUpdate && (
        <ModalEditWebinar
          show={() => setShowWebinarUpdate(!showWebinarUpdate)}
          webinar={webinar}
          Render={{ setRenderWebinar }}
        />
      )}

      <ModalTestimonial testimonial={testimonial} />
      {showTestimonialAdd && (
        <ModalAddTestimonial
          show={() => setShowTestimonialAdd(!showTestimonialAdd)}
          Render={{ setRenderTestimonial }}
        />
      )}
      {showTestimonialUpdate && (
        <ModalEditTestimonial
          Render={{ setRenderTestimonial }}
          show={() => setShowTestimonialUpdate(!showTestimonialUpdate)}
          testimonial={testimonial}
        />
      )}
    </div>
  );
};

export default EventAdmin;
