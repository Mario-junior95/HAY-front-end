import React, { useState, useEffect } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import "./Blog.css";
import Modal from "react-modal";
import Avatar from "../../Images/avatar.png";
import Pagination from "../../Paginate/Paginate";

Modal.setAppElement("#root");

const BlogAdmin = () => {
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
  let [render, setRender] = useState(false);
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

  let handleDelete = async (id) => {
    let response = await fetch("http://localhost:8000/api/blogs/" + id, {
      method: "DELETE",
    });
    let data = await response.text();
    setShow(false);
    setRender(!render);
    alert(data);
  };

  let handleEdit = async (id) => {
    let formData = new FormData();
    formData.append("title_en", newt);
    formData.append("description_en", newd);
    formData.append("title_ar", newh);
    formData.append("description_ar", newg);
    formData.append("image", newi);

    let response = await fetch(
      "http://localhost:8000/api/blogs/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    let data = response.text();
    setRender(!render);
    setHide(true);
  };

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
      setRender(!render);
      setTitleStatus(data);
      setTitlessStatus(data);
    }
  };
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("http://localhost:8000/api/blogs");
      const data = await response.json();
      console.log(data);
      setData([...data]);
    };
    const getSubs = async () => {
      const response = await fetch("http://localhost:8000/api/subscribers");
      const data = await response.json();
      console.log(data);
      setSubs([...data]);
    };
    getSubs();
    getBlogs();
  }, [render]);

  let handleSubDelete = async (id) => {
    const response = await fetch(
      "http://localhost:8000/api/subscribers/" + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.text();
    setRender(!render);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <NavigationAdmin />
      <div>
        <div className="add-a-blog">
          <input
            type="submit"
            value="Add a blog"
            className="Add_Admin_btn"
            onClick={() => setModalIsOpen(true)}
          />
        </div>
        <div className="subs">
          <h2 className="h2---subs">Subscribers :</h2>
          {subs.map((e) => {
            return (
              <p className="p---subs" key={e.id}>
                {e.email}{" "}
                <span
                  className="subs----span"
                  onClick={() => {
                    handleSubDelete(e.id);
                  }}
                >
                  X
                </span>{" "}
              </p>
            );
          })}
        </div>
        <div>
          <h1>List Of Blogs</h1>
          <div className="container admin_table">
            <table className="table  table-lg">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">English Title</th>
                  <th scope="col">Arabic Title</th>
                  <th scope="col">English Description</th>
                  <th scope="col">Arabic Description</th>
                </tr>
              </thead>
              {currentPosts.map((el) => {
                let desc = el.description_en;
                desc = desc.split(" ");
                desc = desc.slice(0, 8);
                desc = desc.join(" ");
                let descss = el.description_ar;
                descss = descss.split(" ");
                descss = descss.slice(0, 8);
                descss = descss.join(" ");
                return (
                  <tbody key={el.id}>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {el.image === "null" ? (
                          <img src={Avatar} alt="error_profile" />
                        ) : (
                          <img
                            src={`http://localhost:8000/storage/${el.image}`}
                            alt="error_profile"
                            height="50px"
                          />
                        )}
                      </td>
                      <td>
                        <span>{el.title_en}</span>
                      </td>

                      <td>
                        <span>{el.title_ar}</span>
                      </td>

                      <td>
                        <span>{desc.slice(0, 10)}</span>
                      </td>

                      <td>
                        <span>{descss.slice(0, 10)}</span>
                      </td>
                      <td>
                        <input
                          type="submit"
                          value="DELETE"
                          className="Delete-button"
                          onClick={() => {
                            setShow(true);
                            setId(el.id);
                            setNeededTitle(el.title_en);
                            setNeededTitless(el.title_ar);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="submit"
                          value="Update"
                          className="Add-button"
                          onClick={(e) => {
                            setId(el.id);
                            setHide(false);
                            setNewt(el.title_en);
                            setNewd(el.description_en);
                            setNewh(el.title_ar);
                            setNewg(el.description_ar);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}

              {show ? (
                <div className="Delete-button---blog">
                  <p className="p----delete-blog">
                    Are you sure you want to delete this blog ?
                  </p>
                  <button
                    className="button___yes"
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Yes
                  </button>
                  &nbsp;
                  <button
                    className="button___no"
                    onClick={() => {
                      setShow(false);
                      setNeededTitle("");
                      setNeededTitless("");
                      setId("");
                    }}
                  >
                    No
                  </button>
                </div>
              ) : (
                false
              )}

              {hide ? (
                false
              ) : (
                <div className="mod____edit">
                  <div className="form___blog____edit">
                    <p className="title__________global">English Title</p>
                    <input
                      className="input_______blog"
                      type="text"
                      placeholder="New title blog"
                      value={newt}
                      onChange={(e) => setNewt(e.target.value)}
                    />
                    <br />
                    <p className="title__________global">Arabic Title</p>
                    <input
                      className="input_______blog"
                      type="text"
                      placeholder="New title blog"
                      value={newh}
                      onChange={(e) => setNewh(e.target.value)}
                    />
                    <br />
                    <p className="title__________global">English Description</p>
                    <textarea
                      className="desc-----global"
                      placeholder="New blog description"
                      cols="50"
                      rows="3"
                      value={newd}
                      onChange={(e) => setNewd(e.target.value)}
                    ></textarea>
                    <br />
                    <br />
                    <p className="title__________global">Arabic Description</p>
                    <textarea
                      className="desc-----global"
                      placeholder="New blog description"
                      cols="50"
                      rows="3"
                      value={newg}
                      onChange={(e) => setNewg(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      className="file__image"
                      type="file"
                      onChange={(e) => setNewi(e.target.files[0])}
                    />
                    <br />
                    <button
                      className="button______edit__blog_one"
                      onClick={(e) => {
                        handleEdit(id);
                      }}
                    >
                      EDIT
                    </button>
                    &nbsp;
                    <button
                      className="button______edit__blog_two"
                      onClick={(e) => {
                        setHide(true);
                        setNewd("");
                        setNewi("");
                        setNewt("");
                        setNewg("");
                        setNewh("");
                        setId("");
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
      <Pagination
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={data.length}
      />
      <Modal
        className="mod"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="form___blog____edit__one">
          <br />
          <div className="en-status-title">
            <p className="status---global">{titleStatus}</p>
            <input
              className="input_______blog"
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
              className="input_______blog"
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
            className="file__image"
            type="file"
            placeholder="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
          />
          <br />
          <button className="add-blog-btn" type="submit" onClick={handleClick}>
            Add Blog
          </button>
          <button
            className="close---blog"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogAdmin;
