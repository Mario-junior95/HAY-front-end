import React, { useState, useEffect } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import "./Contact.css";
import Pagination from "../../Paginate/Paginate";

const ContactAdmin = () => {
  let [data, setData] = useState([]);
  let [cont, setCont] = useState([]);
  let [render, setRender] = useState(false);
  let [id, setId] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      const response = await fetch("http://localhost:8000/api/contact");
      const data = await response.json();
      console.log(data);
      setCont([...data]);
    };
    getContacts();
  }, [render]);

  let handleContactsDelete = async (id) => {
    const response = await fetch("http://localhost:8000/api/contact/" + id, {
      method: "DELETE",
    });
    const data = await response.text();
    setRender(!render);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cont.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <NavigationAdmin />
      <div>
        <h1>Requests :</h1>
        <div className="parent-wrapper">
          {currentPosts.map((e) => {
            return (
              <p key={e.id}>
                <div class="card__contact">
                  <div class="containers_contact">
                    <label>Name:</label> <p>{e.name}</p>
                    <br /> <label>Email:</label> <p>{e.email}</p>
                    <br /> <label>Phone Number:</label> <p>{e.phone_number}</p>
                    <br />
                    <label>Message:</label> <br /> <p>{e.message}</p>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="DELETE"
                        className="Delete-button"
                        onClick={() => {
                          handleContactsDelete(e.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </p>
            );
          })}
        </div>
        <Pagination
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={cont.length}
        />
      </div>
    </div>
  );
};

export default ContactAdmin;
