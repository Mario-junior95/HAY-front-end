import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import UpdateModalTrans from "./UpdateModalTrans";
import SessionProfileTrans from "./SessionProfileTrans";
import confirm, { Button, alert } from "react-alert-confirm";

import {Redirect} from 'react-router-dom';

import "react-alert-confirm/dist/index.css";
// The element to be shown in the modal window

function SessionModal(props) {
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [session, setSession] = useState([]);
  const [render, setRender] = useState(false);
  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };



  useEffect(() => {
    Axios.get("http://localhost:8000/api/support-session").then((response) => {
      setSession(response.data);
    });
  }, [render]);

  const deleteSession = (id) => {
    confirm({
      lang: "en",
      content: <h3>Are you sure you want to delete?</h3>,
      onOk: () => {
        try {
          Axios.delete(`http://localhost:8000/api/support-session/${id}`).then(
            (response) => {
              if (response.data.status === "Token is Expired") {
                expireToken();
                return window.location.reload();
              } else{
              console.log(response.data);
              setRender((prev) => !prev);
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
      },
    });
  };

  return (
    <div className="sessionmodal">
      <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        {session.map((val) => {
          return (
            <div key={val.id}>
              <div
                style={{
                  display: "grid",
                  marginLeft: "6%",
                  gridTemplateColumns: "30% 20% 20% 20%",
                }}
              >
                <p style={{ marginTop: "23%", fontWeight: "bold" }}>
                  {val.name_en}
                </p>
                <SessionProfileTrans data={val} />
                <UpdateModalTrans
                  render={{ setRender }}
                  sessionId={val.id}
                  data={val}
                />
                <input
                  type="submit"
                  style={{ padding: "1%", backgroundColor: "red" }}
                  value="delete"
                  onClick={() => {
                    deleteSession(val.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SessionModal;
