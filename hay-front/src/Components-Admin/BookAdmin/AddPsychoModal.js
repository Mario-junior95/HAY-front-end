import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
// The element to be shown in the modal window

function UpdateSessionModal(props) {
    const { setRender } = props.renderr;
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [descriptionAr, setdescriptionAr] = useState('');
    const [descriptionEn, setdescriptionEn] = useState('');
    const [image, setImage] = useState('empty');
    const [nameEnErr, setnameEnErr] = useState('');
    const [nameArErr, setnameArErr] = useState('');
    const [descriptionArErr, setdescriptionArErr] = useState('');
    const [descriptionEnErr, setdescriptionEnErr] = useState('');

    const handleButton = () => {
        Swal.fire("Added Successfully!", "You clicked the button!", "success");
    };

    const addPsycho = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name_en', nameEn);
        data.append('name_ar', nameAr);
        data.append('description_en', descriptionEn);
        data.append('description_ar', descriptionAr);
        data.append('image', image);
        try {
            await Axios.post('http://localhost:8000/api/psychologist', data)
                .then((response) => {
                    console.log(response.data);
                    setRender(prev => !prev)
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
        <div className="sessionmodal" >
            <form>
                {nameEnErr ? <div style={{color:"red"}}>{nameEnErr}</div> : ""}

                <input type="text" placeholder="New English name" onChange={(e) => {
                    setNameEn(e.target.value);
                }} /><br></br>
                {nameArErr ? <div style={{ color: "red" }}>{nameArErr}</div> : ""}

                <input type="text" placeholder="New Arabic name" onChange={(e) => {
                    setNameAr(e.target.value);
                }} />
                <input style={{ margin: "0 auto" }} type="file" onChange={(e) => {
                    setImage(e.target.files[0]);
                }} />
                {descriptionEnErr ? <div style={{ color: "red" }}>{descriptionEnErr}</div> : ""}

                <input type="text" placeholder="New English Description" onChange={(e) => {
                    setdescriptionEn(e.target.value);
                }} />
                {descriptionArErr ? <div style={{ color: "red" }}>{descriptionArErr}</div> : ""}

                <input type="text" placeholder="New Arabic Description" onChange={(e) => {
                    setdescriptionAr(e.target.value);
                }} />
                <input type="submit" value="add" onClick={addPsycho} />
            </form>
        </div>
    );
}
export default UpdateSessionModal;