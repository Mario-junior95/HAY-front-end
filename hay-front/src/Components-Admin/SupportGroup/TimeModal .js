import { useDialog } from "react-st-modal";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// The element to be shown in the modal window
import confirm from "react-alert-confirm";
import { Redirect } from "react-router-dom";


import "react-alert-confirm/dist/index.css";

function TimeModal(props) {
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [time, setTime] = useState([]);
  const [timee, setTimee] = useState("");
  const [timeErr, setTimeErr] = useState("");
  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/api/time_ss").then((response) => {
      if (response.data.status === "Token is Expired") {
        expireToken();
        return window.location.reload();
      } else {
        setTime(response.data);
      }
    });
  }, [render]);

  const handleButton = () => {
    Swal.fire("Added Successfully!", "You clicked the button!", "success");
  };

  const addTime = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("date", timee);
    try {
      await Axios.post("http://localhost:8000/api/time_ss", data).then(
        (response) => {
          if (response.data.status === "Token is Expired") {
            expireToken();
            return window.location.reload();
          } else {
            console.log(response.data);
            setRender((prev) => !prev);
            handleButton();
          }
        }
      );
    } catch (error) {
      if (error.response) {
        setTimeErr(error.response.data.errors.time);
      }
    }
  };
  const deleteTime = (id) => {
    confirm({
      lang: "en",
      content: <h3>Are you sure you want to delete?</h3>,
      onOk: () => {
        try {
          Axios.delete(`http://localhost:8000/api/time_ss/${id}`).then(
            (response) => {
              if (response.data.status === "Token is Expired") {
                expireToken();
                return window.location.reload();
              } else {
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
      <form>
        <label>Add New Time </label>
        {timeErr ? <div style={{ color: "red" }}>{timeErr}</div> : ""}
        <input
          type="text"
          placeholder="add new time"
          onChange={(e) => {
            setTimee(e.target.value);
          }}
        />
        <input
          type="submit"
          style={{ padding: "2%" }}
          value="Add"
          onClick={addTime}
        />
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "30% 30% 30%" }}>
        {time.map((val) => {
          return (
            <div style={{ width: "120%" }} key={val.id}>
              <p>{val.date}</p>
              <input
                type="submit"
                style={{ padding: "5%" }}
                value="delete"
                onClick={() => {
                  deleteTime(val.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TimeModal;
