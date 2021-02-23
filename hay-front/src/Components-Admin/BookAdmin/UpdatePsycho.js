import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddPsychoTrans from './AddPsychoTrans'
import Swal from "sweetalert2";
// The element to be shown in the modal window

function UpdatePsycho(props) {
    const { setRender } = props.renderr;

    const dialog = useDialog();
    const [value, setValue] = useState();
    const [nameAr, setNameAr] = useState(props.dataa.name_ar);
    const [nameEn, setNameEn] = useState(props.dataa.name_en);
    const [image, setImage] = useState('empty');
    const [descriptionEn, setdescriptionEn] = useState(props.dataa.description_en);
    const [descriptionAr, setdescriptionAr] = useState(props.dataa.description_ar);
    const [nameEnErr, setnameEnErr] = useState('');
    const [nameArErr, setnameArErr] = useState('');
    const [descriptionArErr, setdescriptionArErr] = useState('');
    const [descriptionEnErr, setdescriptionEnErr] = useState('');

    const handleButton = () => {
        Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    };

    const update = async () => {
        const data = new FormData();
        data.append('name_en', nameEn);
        data.append('name_ar', nameAr);
        data.append('image', image);
        data.append('description_en', descriptionEn);
        data.append('description_ar', descriptionAr);

        try {
            await Axios.post(`http://localhost:8000/api/psychologist/${props.id}?_method=PUT`, data)
                .then((response) => {
                    console.log(response.data);
                    setRender(prev => !prev);
                    handleButton();
                })
        } catch (error) {
            if (error.response) {
                setnameArErr(error.response.data.errors.name_ar)
                setnameEnErr(error.response.data.errors.name_en)
                setdescriptionEnErr(error.response.data.errors.description_en)
                setdescriptionArErr(error.response.data.errors.description_ar)
            }

        }
    }


    return (
        <div className="sessionmodal" style={{ display: "grid", gridTemplateColumns: "1fr" }} >

            {nameEnErr ? <div style={{ color: "red" }}>{nameEnErr}</div> : ""}
            <input style={{ margin: "5% auto" }} value={nameEn} type="text" placeholder="enter new English name" onChange={(e) => {
                setNameEn(e.target.value)
            }} />


            {nameArErr ? <div style={{ color: "red" }}>{nameArErr}</div> : ""}
            <input style={{ margin: "5% auto" }} value={nameAr} type="text" placeholder="enter new Arabic name" onChange={(e) => {
                setNameAr(e.target.value)
            }} />


            <input style={{ margin: "5% auto" }} type="file" onChange={(e) => {
                setImage(e.target.files[0])
            }} />


            {descriptionArErr ? <div style={{ color: "red" }}>{descriptionArErr}</div> : ""}
            <input type="text" style={{ margin: "5% auto" }} value={descriptionAr} placeholder="enter new Arabic Description" onChange={(e) => {
                setdescriptionAr(e.target.value)
            }} />


            {descriptionEnErr ? <div style={{ color: "red" }}>{descriptionEnErr}</div> : ""}
            <input type="text" style={{ margin: "5% auto" }} value={descriptionEn} placeholder="enter new English Description" onChange={(e) => {
                setdescriptionEn(e.target.value)
            }} />
            <input type="submit" value="update" onClick={(id) => { update(id) }} />

        </div>
    );
}
export default UpdatePsycho;