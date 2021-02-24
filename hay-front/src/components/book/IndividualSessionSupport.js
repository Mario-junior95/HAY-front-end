import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import PsychologistTransport from "./PsychologistTransport";
import Session from "../../images/session.jpeg";
import Swal from "sweetalert2";

// The element to be shown in the modal window

function IndividualSession(props) {
  console.log(props.psy)

console.log(props.psycho)

  const [user, setUser] = useState([props.user]);

  const dialog = useDialog();
  const [value, setValue] = useState();
  const [data, setData] = useState(props.dat);
  const [language, setLanguage] = useState(props.language);
  const [time, setTime] = useState([]);
  const [chosenTime, setChosenTime] = useState('');
  const [statusErr, setStatusErr] = useState("");
  const [timeErr, setTimeErr] = useState("");
  const [bookingLength, setBookingLength] = useState([]);
  const [userId, setUserId] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/time_ss").then((response) => {
      setTime(response.data.time);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/user-supportGroup").then((response) => {
      setBookingLength(response.data.length);
    });
  }, []);


  const handleButtonn = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You have already booked this session!",
    });
  };

  const handleButton = () => {
    Swal.fire(
      "You have joined Successfully!",
      "You clicked the button!",
      "success"
    );
  };

  const handleButtonErr = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We are fully booked!",
    });
  };

  const handleJoin = async (e) => {
    if (localStorage.getItem("id") === null) {
      setStatusErr("You have to log in to proceed");
    } else if (!chosenTime) {
      setTimeErr("Please pick a specific time");
    } else if (bookingLength.length > 3) {
      handleButtonErr();
    } else {
      e.preventDefault();
      const data = new FormData();
      data.append("user_id", localStorage.getItem("id"));
      data.append("support_session_id", props.dat.id);
      data.append("time_ss_id", chosenTime);
      try {
        await Axios.post("http://localhost:8000/api/user-supportGroup", data).then(
          (response) => {
            console.log(response.data);
            setTimeErr("");
            setStatusErr("");
            handleButton();
          }
        );
      } catch (err) {
        handleButtonn();
      }
    }
  };

  return (
    <div
      className="sessionmodal"
      style={{ display: "flex", flexDirection: "column", paddingBottom: "2%" }}
    >
      <span>
        {language === true ? (
          <span>{props.dat.name_en}</span>
        ) : (
          <span>{props.dat.name_ar}</span>
        )}
      </span>
      {props.dat.image === "null" ? (
        <img
          style={{ width: "50%", margin: "0 auto" }}
          src={Session}
          alt="error_profile"
        />
      ) : (
        <img
          style={{ width: "50%", margin: "0 auto" }}
          src={`http://localhost:8000/storage/${props.dat.image}`}
          alt="error_profile"
        />
      )}
      <span>
        {language === "English" ? (
          <span>{props.dat.date}</span>
        ) : (
          <span>{props.dat.date}</span>
        )}
      </span>
      <span>
        {language === true ? (
          <span>{props.dat.description_en}</span>
        ) : (
          <span>{props.dat.description_ar}</span>
        )}
      </span>
      <PsychologistTransport lang={props.language} psy={props.psycho} />
      <div style={{ color: "red" }}>{timeErr}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          marginTop: "4%",
        }}
      >
        {time.map((val) => {
          return (
            <div style={{ marginLeft: "5%" }} key={val.id}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {val.date}
                <input
                  type="radio"
                  name="time"
                  onChange={(e) => {
                    setChosenTime(val.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ color: "red" }}>{statusErr}</div>
      <div style={{ color: "red" }}>{userId}</div>
      <button
        id="signup"
        style={{ width: "120px", borderRadius: "15px", margin: "3% auto" }}
        onClick={handleJoin}
      >
        Join Session
      </button>
    </div>
  );
}
export default IndividualSession;
