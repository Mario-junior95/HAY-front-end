import React, { useState, useEffect } from "react";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import BookAdminTrans from "./BookAdminTrans";
import Axios from "axios";
import ListSessionsTrans from "./ListSessionsTrans";
import TimeTrans from "./TimeTrans";
import PsychoTrans from "./PsychoTrans";
import TherapyTrans from "./TherapyTrans";
import ViewTherapyTrans from "./ViewTherapyTrans";
import ViewBookedSessionsTrans from "./ViewBookedSessionsTrans";
import AddGroupTherapyTrans from "./AddGroupTherapyTrans";

import { Link } from "react-router-dom";

const BookAdmin = () => {
  const [therapy, setTherapy] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:8000/api/group-therapy')
      .then((response) => {
        setTherapy(response.data.therapy);

      })
  }, [render])

 const lengthh = therapy.length;

  return (
    <div>
      <NavigationAdmin />
      <div className="container">
        <h1 style={{ marginTop: "5%" }}>Group Therapy</h1>
  
        <AddGroupTherapyTrans render ={{setRender}}/>
        <ViewBookedSessionsTrans  />
        <Link to="/Admin-Book">Group therapy</Link>
        <Link to="/Admin-Book-Support">/ Support Group </Link>

        {therapy.map((val) => {
          return (
            <div style={{ marginTop: "7%" }} key={val.id}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                }}
              >
                <h4 style={{ marginTop: "15%", fontWeight: "bold" }}>
                  Group Therapy
                </h4>
                <ViewTherapyTrans length={lengthh} render ={{setRender}} data={val} />
                <TherapyTrans
                  render={{ setRender }}
                  data={val}
                  therapyId={val.id}
                />
                <PsychoTrans render={{ setRender }} />
              </div>
              <div
                style={{ borderBottom: "2px green solid", marginTop: "1%" }}
              ></div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                }}
              >
                <h4 style={{ marginTop: "15%", fontWeight: "bold" }}>
                  Therapy Sessions{" "}
                </h4>
                <BookAdminTrans render={{ setRender }} therapyId={val.id} />
                <ListSessionsTrans render={{ setRender }} />
                <TimeTrans render={{ setRender }} />{" "}
              </div>

              <div></div>
            </div>
          );
        })}
      </div>
    </div>
        );
      };

export default BookAdmin;
