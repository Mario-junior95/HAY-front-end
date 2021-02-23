import React, { useEffect, useState } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import Axios from "axios";
import "./Admin.css";
import AdminUpdateFrom from "./AdminUpdateFrom";
import AddAdmin from "./AddAdmin";
import "./AddAdmin.css";
import Avatar from "../../Images/avatar.png";
import Pagination from "../../Paginate/Paginate";
import { Redirect } from "react-router-dom";

const Admin = () => {
  const [listAdmin, setListAdmin] = useState([]);

  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  useEffect(() => {
    try {
      Axios.get("http://localhost:8000/api/admin", {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
        if (response.data.status === "Token is Expired") {
          expireToken();
          return window.location.reload();
        } else {
          return setListAdmin(response.data);
        }
      });
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, [render]);

  /** Delete Admin */

  const deleteAdmin = async (id) => {
    try {
      await Axios.delete(`http://localhost:8000/api/admin/${id} `, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
        if (response.data.status === "Token is Expired") {
          expireToken();
          return window.location.reload();
        } else if (response.status === 200) {
          console.log(response);
          setRender((prev) => !prev);
        }
      });
    } catch (err) {
      console.log(err);
      localStorage.clear();
    }
  };

  /**  Pagination  */

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listAdmin.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavigationAdmin />
      <input
        type="submit"
        value="Add Admin"
        className="Add_Admin_btn"
        data-toggle="modal"
        data-target="#myModal"
      />
      <AddAdmin render={{ setRender }} />
      <h1>List Of Admins</h1>
      <div className="container admin_table">
        <table className="table  table-lg">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          {currentPosts.map((val) => {
            return (
              <tbody key={val.id}>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {val.image === "null" ? (
                      <img src={Avatar} alt="error_profile" />
                    ) : (
                      <img
                        src={`http://localhost:8000/storage/${val.image}`}
                        alt="error_profile"
                      />
                    )}
                  </td>
                  <td>
                    <span>{val.username}</span>
                  </td>
                  <td>
                    <span>{val.firstname}</span>
                  </td>
                  <td>
                    <span>{val.lastname}</span>
                  </td>
                  <td>
                    <span>{val.email}</span>
                  </td>
                  <td>
                    <AdminUpdateFrom
                      key={val.id}
                      listAdmin={val}
                      render={{ setRender }}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="DELETE"
                      className="Delete-button"
                      onClick={() => deleteAdmin(val.id)}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <Pagination
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={listAdmin.length}
        />
      </div>
    </div>
  );
};

export default Admin;
