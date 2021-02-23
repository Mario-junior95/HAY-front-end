import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Redirect } from "react-router-dom";


const CreateSessionModal = (props) => {
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [image, setImage] = useState("null");
  const [date, setDate] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [psychologist, setPsychologist] = useState(0);

  const [listPsychologist, setListPsychologist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/psychologist", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("tokens"),
      },
    }).then((response) => {
      setListPsychologist(response.data.psychologist);
    });
  }, []);

  const clickHandler = () => {
    setNameArErr("");
    setNameEnErr("");
    setDescriptionEnErr("");
    setDescriptionArErr("");
    setDateErr("");
    setNameAr("");
    setNameEn("");
    setDescriptionEn("");
    setDescriptionAr("");
    setDate("");
    setPsychoErr("");
  };

  /** errors */

  const [nameEnErr, setNameEnErr] = useState("");
  const [nameArErr, setNameArErr] = useState("");

  const [dateErr, setDateErr] = useState("");
  const [descriptionEnErr, setDescriptionEnErr] = useState("");
  const [descriptionArErr, setDescriptionArErr] = useState("");
  const [psyhoErr, setPsychoErr] = useState("");

  const handleButton = () => {
    Swal.fire("Added Successfully!", "You clicked the button!", "success");
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact to="/Admin-Login" />;
  };

  const addSession = async (e) => {
    e.preventDefault();
    if (!psychologist) {
      setPsychoErr("You have to pick a psychologist");
    } else {
      const data = new FormData();
      data.append("name_en", nameEn);
      data.append("name_ar", nameAr);
      data.append("description_en", descriptionEn);
      data.append("description_ar", descriptionAr);
      data.append("image", image);
      data.append("date", date);
      data.append("psychologist_id", psychologist);
      try {
        await Axios.post("http://localhost:8000/api/support-session", data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        }).then((response) => {
          if (response.data.status === "Token is Expired") {
            expireToken();
            return window.location.reload();
          } else {
            console.log(response.data);
            handleButton();
            clickHandler();
          }
        });
      } catch (error) {
        if (error.response) {
          setNameArErr(error.response.data.errors.name_ar);
          setNameEnErr(error.response.data.errors.name_en);
          setDescriptionEnErr(error.response.data.errors.description_en);
          setDescriptionArErr(error.response.data.errors.description_ar);
          setDateErr(error.response.data.errors.date);
        } else {
          setPsychoErr("You should Pick a Psychologist");
        }
      }
    }
  };
  return (
    <div>
      <span style={{ color: "red" }}>{nameEnErr}</span>
      <br />
      <input
        type="text"
        placeholder="English Name"
        value={nameEn}
        onChange={(e) => {
          setNameEn(e.target.value);
        }}
      />
      <br />
      <span style={{ color: "red" }}>{nameArErr}</span>
      <br />
      <input
        type="text"
        placeholder="Arabic Name"
        value={nameAr}
        onChange={(e) => {
          setNameAr(e.target.value);
        }}
      />
      <br />
      <span style={{ color: "red" }}>{dateErr}</span>
      <br />
      <input
        type="date"
        placeholder="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <br />
      <span style={{ color: "red" }}>{descriptionEnErr}</span>
      <br />
      <textarea
        placeholder="English Description"
        rows="4"
        cols="50"
        value={descriptionEn}
        onChange={(e) => {
          setDescriptionEn(e.target.value);
        }}
      ></textarea>
      <br />
      <span style={{ color: "red" }}>{descriptionArErr}</span>
      <br />
      <textarea
        placeholder="Arabic Description"
        rows="4"
        s
        cols="50"
        value={descriptionAr}
        onChange={(e) => {
          setDescriptionAr(e.target.value);
        }}
      ></textarea>
      <br />
      <span style={{ color: "red" }}>{psyhoErr}</span>
      <br />
      <select
        onChange={(e) => {
          setPsychologist(e.target.value);
        }}
      >
        <option>Psychologist</option>
        {listPsychologist.map((val) => {
          return (
            <>
              <option key={val.id} value={val.id}>
                {val.name_en}
              </option>
            </>
          );
        })}
      </select>

      <br />
      <input type="submit" value="submit" onClick={addSession} />
    </div>
  );
};

export default CreateSessionModal;
