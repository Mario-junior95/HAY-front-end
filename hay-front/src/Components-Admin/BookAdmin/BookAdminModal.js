import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
// The element to be shown in the modal window

function SessionModal(props) {
    const { setRender } = props.renderr;
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('empty');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [psychologist, setPsychologist] = useState([]);
    const [psychologistId, setPsychologistId] = useState('');
    const [nameEnErr, setnameEnErr] = useState('');
    const [nameArErr, setnameArErr] = useState('');
    const [descriptionArErr, setdescriptionArErr] = useState('');
    const [descriptionEnErr, setdescriptionEnErr] = useState('');
    const [dateErr, setdateErr] = useState('');
    const [err , setErr] = useState('');


    useEffect(() => {
        Axios.get('http://localhost:8000/api/psychologist')
            .then((response) => {
                setPsychologist(response.data.psychologist)
            })
        return ()=> {
            setPsychologist('');
        }
    }, [])
    const handleButton = () => {
        Swal.fire("Added Successfully!", "You clicked the button!", "success");
    };
    const create = async (e) => {
        e.preventDefault();
       
        const data = new FormData();
        data.append('name_en', nameEn);
        data.append('name_ar', nameAr);
        data.append('date', date);
        data.append('image', image);
        data.append('description_en', descriptionEn);
        data.append('description_ar', descriptionAr);
        data.append('therapy_id', props.id);
        data.append('psychologist_id', psychologistId);

        try {
            await Axios.post('http://localhost:8000/api/user-therapy', data)
                .then((response) => {
                    console.log(response.data)
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
                    <input style={{ margin: "3% auto" }} type="text" placeholder="English name" onChange={(e) => {
                        setNameEn(e.target.value);
                    }} />
                    {nameArErr ? <div style={{ color: "red" }}>{nameArErr}</div> : ""}
                    <input style={{ margin: "3% auto" }} type="text" placeholder="Arabic name" onChange={(e) => {
                        setNameAr(e.target.value);
                    }} />
                </div>

                {dateErr ? <div style={{ color: "red" }}>{dateErr}</div> : ""}
                <input style={{ margin: "3% auto" }} type="text" placeholder="date" onChange={(e) => {
                    setDate(e.target.value);
                }} />

                <input style={{ margin: "3% auto" }} type="file" onChange={(e) => {
                    setImage(e.target.files[0]);
                }} />

                {descriptionEnErr ? <div style={{ color: "red" }}>{descriptionEnErr}</div> : ""}
                <input type="text" placeholder="English description" onChange={(e) => {
                    setDescriptionEn(e.target.value);
                }} />
                {descriptionArErr ? <div style={{ color: "red" }}>{descriptionArErr}</div> : ""}

                <input type="text" placeholder="Arabic description" onChange={(e) => {
                    setDescriptionAr(e.target.value);
                }} />
                <div>
                    <label>
                       <div style={{color:"red"}}>{err}</div>
                        <select onChange={(e) => {
                            setPsychologistId(e.target.value);
                        }}>
                            <option>Psychologist</option>
                            {psychologist.map((val) => {

                                return (
                                    <option key={val.id} value={val.id}>{val.name_en}</option>
                                );


                            })}
                        </select>
                    </label>

                </div>
                <input type="submit" value="create" onClick={create} />
            </form>

        </div>
    );
}
export default SessionModal;