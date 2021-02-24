import React, { useEffect, useState } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

import ViewSupportGroupFrom from "./ViewSupportGroupForm";
import UpdateSupportGroupForm from "./UpdateSupportGroupForm";
import PsychoTrans from "./PsychoTrans";
import ListSessionsTrans from "./ListSessionTrans";
import TimeTrans from "./TimeTrans ";
import ViewBookedSessionsTrans from "./ViewBookedSessionsTrans ";
import CreateSessionFrom from "./CreateSessionFrom";
import AddGroupTherapyTrans from "./AddGroupTherapyTrans";

const SupportGroup = () => {
  const [supportGroup, setSupportGroup] = useState([]);
  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  useEffect(() => {
    try {
      Axios.get("http://localhost:8000/api/support-group", {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
        if (response.data.status === "Token is Expired") {
          expireToken();
          return window.location.reload();
        } else {
          return setSupportGroup(response.data);
         
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [render]);


  return (
    <div className="container">
      <NavigationAdmin />
      <h1 style={{ marginTop: "5%" }}>Support Group</h1>
      <AddGroupTherapyTrans render={{ setRender }} />
      <ViewBookedSessionsTrans />
      <Link to="/Admin-Book">Group therapy</Link>
      <Link to="/Admin-Book-Support">/ Support Group </Link>

      {supportGroup.map((val) => {
        return (
          <div style={{ marginTop: "7%" }} key={val.id}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Support Group</h4>
              <ViewSupportGroupFrom listSupport={val} render={{ setRender }} />
              <UpdateSupportGroupForm
                listSupport={val}
                render={{ setRender }}
              />
              <PsychoTrans render={{ setRender }} />
            </div>
            <div
              style={{ borderBottom: "2px green solid", marginTop: "2.5%" }}
            ></div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr ",
              }}
            >
              <h4 style={{ marginTop: "18%", fontWeight: "bold" }}>
                Support Session
              </h4>
              <CreateSessionFrom />
              <ListSessionsTrans render={{ setRender }} />
              <TimeTrans render={{ setRender }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportGroup;
