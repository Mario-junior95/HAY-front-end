import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import "./Blog.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer";
import Axios from "axios";
import Swal from "sweetalert2";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

AOS.init();
const Blog = () => {
  const [subscribersNum, setSubscribersNum] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/subscribers").then((response) => {
      setSubscribersNum(response.data);
    });
  }, [render]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("http://localhost:8000/api/blogs" );
      const data = await response.json();
      setData([...data]);
      console.log(data);
      AOS.init({
        duration: 3000,
      });
    };
    getBlogs();
  }, [render]);

  const Length = subscribersNum.length;

  const handleButton = () => {
    Swal.fire("Subscribed Successfully!", "You clicked the button!", "success");
  };

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [arabic, setArabic] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [imageLanguage, setImageLanguage] = useState(false);


  const handleSubscribe = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);

    try {
      await Axios.post("http://localhost:8000/api/subscribers", data , {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }}).then(
        (response) => {
          console.log(response.data);
          setRender((prev) => !prev);
          handleButton();
          setStatus("");
        }
      );
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.errors.email);
      }
    }
  };

  // const handleSubscribe = async () => {
  //   let formData = new FormData();
  //   formData.append("email", email);
  //   const response = await fetch("http://localhost:8000/api/subscribers", {
  //     method: "POST",
  //     headers: {
  //       "X-Requested-With": "XMLHttpRequest",
  //     },
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   if (data.email) {
  //     setStatus(data.email[0]);
  //     setRender(prev => !prev);
  //   } else {
  //     setStatus(data.Message);
  //     setEmail("");
  //   }
  // };

  return (
    <div>
      <Navigation />

      <div className="subscribe____main">
      <span className="label1" style={{ color: "white" , position:"absolute" ,left:"46%" ,top:"48.7%" ,color:"white" }}>Ar</span>{" "}
        <label style={{ position:"absolute",left:"48%" ,top:"47.7%"}} className="switch switch1">
          <input style={{  top:"45%"}}
            type="checkbox"
            onChange={(e) => {
              setImageLanguage(e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
        <span className="label2" style={{ color: "white" , position:"absolute" ,left:"54%" ,top:"48.7%" ,color:"white" }}>En</span>
        { imageLanguage === true ?  <h1 style={{ paddingTop: "14%", fontSize:"25px" }} className="title"> This is your place to  learn more mental health.</h1> : <h1 style={{ paddingTop: "14%" , fontSize:"25px" }} className="title">هنا مساحتك الآمنة لمعرفة المزيد حول مواضيع الصحة النفسية</h1>  }

       
      </div>
      <span
        className="numberofSubs"
        style={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
      >
        Subscribers : {Length}
      </span>

      <div className="Blogs-banner"></div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", marginTop: "5%" }}
      >
        <div className="wavves">
          <span style={{ "--i": 1 }}>S</span>
          <span style={{ "--i": 2 }}>U</span>
          <span style={{ "--i": 3 }}>B</span>
          <span style={{ "--i": 4 }}>S</span>
          <span style={{ "--i": 5 }}>C</span>
          <span style={{ "--i": 6 }}>R</span>
          <span style={{ "--i": 7 }}>I</span>
          <span style={{ "--i": 8 }}>B</span>
          <span style={{ "--i": 9 }}>E</span>&nbsp;&nbsp;
          <span style={{ "--i": 8 }}>H</span>
          <span style={{ "--i": 8 }}>E</span>
          <span style={{ "--i": 8 }}>R</span>
          <span style={{ "--i": 8 }}>E</span>
        </div>
        <p className="status___subs">{status}</p>
        <input
          className="input______subscribers"
          type="text"
          style={{ margin: "0 auto", borderRadius: "25px", fontWeight: "bold" }}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <button
        style={{
          borderRadius: "15px",
        }}
        className="button___subs"
        onClick={handleSubscribe}
      >
        SUBSCRIBE
      </button>
      <div className="language_____switch___blog">
        <span style={{ color: "black", fontWeight: "bold" }}>En</span>{" "}
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => {
              setArabic(!arabic);
            }}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ color: "black", fontWeight: "bold" }}>Ar</span>
      </div>
      <div className="blogs____wrapper">
        <div data-aos="fade-up" className="blogs___one">
          {data.map((blog) => {
            let descEn = blog.description_en;
            descEn = descEn.split(" ");
            descEn = descEn.slice(0, 5);
            descEn = descEn.join(" ");
            let descAr = blog.description_ar;
            descAr = descAr.split(" ");
            descAr = descAr.slice(0, 5);
            descAr = descAr.join(" ");
            let created_at = JSON.stringify(blog.created_at);
            created_at = created_at.slice(1, 11);
            return arabic ? (
              <div
                className="blog____two"
                key={blog.id}
                style={{ borderRadius: "25px" }}
              >
                <div className="blog____image">
                  <img
                    className="image_______blog"
                    src={`http://localhost:8000/storage/${blog.image}`}
                    alt=""
                  />
                </div>
                <div className="body_____blog">
                  <div>
                    <h1 className="title_____blog_ar">{blog.title_ar}</h1>
                    <p className="desc______blog_ar">{descAr}</p>
                    <p className="time______blog_ar">{created_at}</p>
                  </div>
                  <button
                    className="readmore__blog"
                    onClick={() => {
                      setShow(true);
                      setId(blog.id);
                      setTitle(blog.title_ar);
                      setDesc(blog.description_ar);
                      setImg(blog.image);
                    }}
                  >
                    اقرأ أكثر
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="event-icon"
                      style={{ marginLeft: "2em" }}
                    />
                  </button>
                  <p></p>
                </div>
              </div>
            ) : (
              <div className="blog____two" key={blog.id}>
                <div className="blog____image">
                  <img
                    style={{ width: "100" }}
                    className="image_______blog"
                    src={`http://localhost:8000/storage/${blog.image}`}
                    alt=""
                  />
                </div>
                <div className="body_____blog">
                  <div>
                    <h1 className="title_____blog_en">{blog.title_en}</h1>
                    <p className="desc______blog_en">{descEn}...</p>
                    <p className="time______blog_en">{created_at}</p>
                  </div>
                  <button
                    className="readmore__blog"
                    onClick={() => {
                      setShow(true);
                      setId(blog.id);
                      setTitle(blog.title_en);
                      setDesc(blog.description_en);
                      setImg(blog.image);
                    }}
                  >
                    Read more
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="event-icon"
                      style={{ marginLeft: "2em" }}
                    />
                  </button>
                  <p></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {show ? (
        <div className="model_______blogs">
          <div className="model__________main">
            <div className="model_______wrap">
              <div className="model_______wrap__two">
                <div className="blogs___one">
                  <p onClick={() => setShow(false)} className="x">
                    x
                  </p>
                  <div className="blog____image">
                    <img
                      src={`http://localhost:8000/storage/${img}`}
                      alt=""
                      className="image___blog"
                    />
                  </div>
                  <div className="body_____blog">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
      <Footer />
    </div>
  );
};

export default Blog;
