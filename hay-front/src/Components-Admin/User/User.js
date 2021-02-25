import React, { useState, useEffect } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import Pagination from "../../Paginate/Paginate";
import ModalViewUsers from "./UserViewButton";
import "./UserAdminPanel.css";
import Axios from "axios";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/user").then((response) => {
      setUser(response.data);
      console.log(response.data);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = user.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <NavigationAdmin />
      <h1 style={{ marginTop: "120px" }}>List Of Users</h1>
      <div>
        <div className="table">
          <div>
            <div className="row1">
              <div className="col0 col3 grow-1">Name</div>
              <div className="col0 col3 grow-1">Email</div>
              <div className="actionTitle col0 col3">Action</div>
            </div>
          </div>
          {currentUsers.map((user) => {
            return (
              <div className="row0 rowData" key={user.id}>
                <div className="col0 col3 grow-1">{user.name}</div>
                <div className="col0 col3 grow-1">{user.email}</div>
                <div className="col0 col3 ">
                  <div className="action">
                    <ModalViewUsers key={user.id} user={user} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={user.length}
        />
      </div>
    </div>
  );
};

export default User;
