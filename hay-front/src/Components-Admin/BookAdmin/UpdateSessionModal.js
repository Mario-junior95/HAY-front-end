import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
// The element to be shown in the modal window

function UpdateSessionModal(props) {
    const { setRender } = props.renderr;

    const dialog = useDialog();
    const [value, setValue] = useState();
    const [newNameEn, setnewNameEn] = useState(props.sessions.name_en);
    const [newNameAr, setnewNameAr] = useState(props.sessions.name_ar);
    const [newDate, setnewDate] = useState(props.sessions.date);
    const [newImage, setnewImage] = useState('empty');
    const [newDescriptionEn, setnewDescriptionEn] = useState(props.sessions.description_en);
    const [newDescriptionAr, setnewDescriptionAr] = useState(props.sessions.description_ar);
    const [newPsychologistId, setnewPsychologistId] = useState('');
    const [nameEnErr, setnameEnErr] = useState('');
    const [nameArErr, setnameArErr] = useState('');
    const [descriptionArErr, setdescriptionArErr] = useState('');
    const [descriptionEnErr, setdescriptionEnErr] = useState('');
    const [dateErr, setdateErr] = useState('');
    const [psychologist, setPsychologist] = useState([]);

    const handleButton = () => {
        Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    };

    useEffect(() => {
        Axios.get('http://localhost:8000/api/psychologist')
            .then((response) => {
                setPsychologist(response.data.psychologist)
            })
    }, [])



    const update = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name_en', newNameEn);
        data.append('name_ar', newNameAr);
        data.append('date', newDate);
        data.append('image', newImage);
        data.append('description_en', newDescriptionEn);
        data.append('description_ar', newDescriptionAr);
        data.append('psychologist_id', newPsychologistId);

        try {
            await Axios.post(`http://localhost:8000/api/user-therapy/${props.id}?_method=PUT`, data)
                .then((response) => {
                    console.log(response.data);
                    setRender(prev => !prev);
                    handleButton();
                })
        } catch (error) {
            if (error.response) {
                setnameEnErr(error.response.data.errors.name_en);
                setdescriptionArErr(error.response.data.errors.description_ar);
                setnameArErr(error.response.data.errors.name_ar);
                setdescriptionEnErr(error.response.data.errors.description_en);
                setdateErr(error.response.data.errors.date);
            }

        }


    }




    return (
        <div className="sessionmodal" >
            <form>
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    {nameEnErr ? <div style={{ color: "red" }}>{nameEnErr}</div> : ""}

                    <input style={{ margin: "4% auto" }} value={newNameEn} type="text" placeholder="English name" onChange={(e) => {
                        setnewNameEn(e.target.value);
                    }} />
                    {nameArErr ? <div style={{ color: "red" }}>{nameArErr}</div> : ""}

                    <input style={{ margin: "0 auto" }} value={newNameAr} type="text" placeholder="Arabic name" onChange={(e) => {
                        setnewNameAr(e.target.value);
                    }} />
                </div>
                {dateErr ? <div style={{ color: "red" }}>{dateErr}</div> : ""}

                <input value={newDate} type="text" placeholder="date" onChange={(e) => {
                    setnewDate(e.target.value);
                }} />

                <input style={{ margin: "0 auto" }} type="file" onChange={(e) => {
                    setnewImage(e.target.files[0]);
                }} />

                {descriptionEnErr ? <div style={{ color: "red" }}>{descriptionEnErr}</div> : ""}

                <input value={newDescriptionEn} type="text" placeholder="English description" onChange={(e) => {
                    setnewDescriptionEn(e.target.value);
                }} />
                {descriptionArErr ? <div style={{ color: "red" }}>{descriptionArErr}</div> : ""}

                <input value={newDescriptionAr} type="text" placeholder="Arabic description" onChange={(e) => {
                    setnewDescriptionAr(e.target.value);
                }} />
                {/* <div>
                <select onChange={(e) => {
                    setnewPsychologistId(e.target.value);
                }}><option>Psychologist</option>
                    {psychologist.map((val) => {

                        return <option key={val.id} value={val.id}>{val.name_en}</option>


                    })}
                </select>
                </div> */}
                <input type="submit" value="update" onClick={(id) => { update(id) }} />
            </form>

        </div>
    );
}
export default UpdateSessionModal;