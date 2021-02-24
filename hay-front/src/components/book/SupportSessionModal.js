import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Helper/Context";

import Session from "../../images/session.jpeg";
import SupportSessionTransport from "./SupportSessionTransport";

// The element to be shown in the modal window

function SupportSessionModal(props) {
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [language, setLanguage] = useState(props.language);
  const [pivot, setPivot] = useState([]);
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     Axios.get("http://localhost:8000/api/user-therapy").then((response) => {
  //       setData(response.data.session);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     Axios.get("http://localhost:8000/api/usersession").then((response) => {
  //       setPivot(response.data.usersession);
  //     });
  //   }, []);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/support-session").then((response) => {
      setData(response.data);
    });
  }, []);

  //   useEffect(() => {
  //     Axios.get("http://localhost:8000/api/user-supportGroup").then((response) => {
  //       console.log(response.data);
  //     });
  //   }, []);

  return (
    <div className="sessionmodal">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          paddingBottom: "5%",
        }}
      >
        {data.map((val) => {
          console.log(val && val.user);
          let descEn = JSON.stringify(val.description_en).slice(1, 50) + "...";
          let descAr = JSON.stringify(val.description_ar).slice(1, 50) + "...";

          return (
            <div className="session-div" key={val.id}>
              <div
                style={{ marginLeft: "5%", height: "fit-content" }}
                className="inner-session"
              >
                {language === true ? (
                  <span>{val.name_en}</span>
                ) : (
                  <span>{val.name_ar}</span>
                )}
                {val.image === "null" ? (
                  <img
                    style={{ width: "100%", margin: "0 auto" }}
                    src={Session}
                    alt="error_profile"
                  />
                ) : (
                  <img
                    style={{ width: "100%", margin: "0 auto" }}
                    src={`http://localhost:8000/storage/${val.image}`}
                    alt="error_profile"
                  />
                )}

                {language === true ? (
                  <span>{descEn}</span>
                ) : (
                  <span>{descAr}</span>
                )}
              </div>

              {/* <SessionTransport
                lang={props.language}
                psy={val.psychologist}
                data={val}
              /> */}
              <SupportSessionTransport
                lang={props.language}
                psy={val.psychologist}
                data={val}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SupportSessionModal;
