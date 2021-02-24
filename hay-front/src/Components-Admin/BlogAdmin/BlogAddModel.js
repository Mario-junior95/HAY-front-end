import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalAddBlog = (props) => {
  const { setRender } = props.Render;
  let [title, setTitle] = useState("");
  let [titless, setTitless] = useState("");
  let [subs, setSubs] = useState([]);
  let [desc, setDesc] = useState("");
  let [descss, setDescss] = useState("");
  let [image, setImage] = useState("");
  let [data, setData] = useState([]);
  let [titleStatus, setTitleStatus] = useState("");
  let [descStatus, setDescStatus] = useState("");
  let [titlessStatus, setTitlessStatus] = useState("");
  let [descssStatus, setDescssStatus] = useState("");
  let [imgStatus, setImgStatus] = useState("");
  //   let [render, setRender] = useState(false);
  let [show, setShow] = useState(false);
  let [hide, setHide] = useState(true);
  let [neededTitle, setNeededTitle] = useState("");
  let [neededTitless, setNeededTitless] = useState("");
  let [id, setId] = useState("");
  let [newd, setNewd] = useState("");
  let [newt, setNewt] = useState("");
  let [newg, setNewg] = useState("");
  let [newh, setNewh] = useState("");
  let [newi, setNewi] = useState("empty");
  let handleClick = async () => {
    let formData = new FormData();
    formData.append("title_en", title);
    formData.append("description_en", desc);
    formData.append("title_ar", titless);
    formData.append("description_ar", descss);
    formData.append("image", image);

    let response = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    });

    let dataStatus = await response;
    if (dataStatus.ok == false) {
      let dataJson = await response.json();
      if (dataJson.errors.title_en) {
        setTitleStatus(dataJson.errors.title_en[0]);
      }
      if (dataJson.errors.description_en) {
        setDescStatus(dataJson.errors.description_en[0]);
      }
      if (dataJson.errors.title_ar) {
        setTitlessStatus(dataJson.errors.title_ar[0]);
      }
      if (dataJson.errors.description_ar) {
        setDescssStatus(dataJson.errors.description_ar[0]);
      }
      if (dataJson.errors.image) {
        setImgStatus(dataJson.errors.image[0]);
      }
    } else {
      let data = await response.text();
      setTitle("");
      setDesc("");
      setTitless("");
      setDescss("");
      setImage("");
      setRender((prev) => !prev);
      setTitleStatus(data);
      //   setTitlessStatus(data);
    }
  };

  return (
    <div className="modal fade " id="blog-add-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="event-header">Add New Blog</h2>

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
            <div>
              <br />
              <div className="en-status-title">
                <p className="status---global">{titleStatus}</p>
                <input
                  type="text"
                  placeholder="English title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div className="ar-status-title">
                <p className="status---global">{titlessStatus}</p>
                <input
                  type="text"
                  placeholder="عنوان عربي"
                  onChange={(e) => {
                    setTitless(e.target.value);
                  }}
                  value={titless}
                />
              </div>
              <div className="en-status-desc">
                <p className="status---global">{descStatus}</p>
                <textarea
                  className="desc-----global"
                  placeholder="English description"
                  cols="20"
                  rows="3"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  value={desc}
                ></textarea>
              </div>
              <div className="ar-status-desc">
                <p className="status---global">{descssStatus}</p>
                <textarea
                  className="desc-----global"
                  placeholder="الوصف العربي"
                  cols="20"
                  rows="3"
                  onChange={(e) => {
                    setDescss(e.target.value);
                  }}
                  value={descss}
                ></textarea>
              </div>
              <p className="status---global">{imgStatus}</p>

              <input
                type="file"
                placeholder="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                required
              />
              <br />
              <button
                className="add-blog-btn"
                type="submit"
                onClick={handleClick}
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBlog;
