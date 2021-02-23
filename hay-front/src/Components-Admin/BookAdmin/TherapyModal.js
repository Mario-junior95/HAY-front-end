import { useDialog } from "react-st-modal";
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
// The element to be shown in the modal window

function SessionModal(props) {
    const { setRender } = props.renderr;
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [titleEn, setTitleEn] = useState(props.dataa.title_en);
    const [titleAr, setTitleAr] = useState(props.dataa.title_ar);
    const [descriptionEn, setDescriptionEn] = useState(props.dataa.description_en);
    const [descriptionAr, setDescriptionAr] = useState(props.dataa.description_ar);
    const [image, setImage] = useState('empty');
    const [titleEnErr, setTitleEnErr] = useState('');
    const [titleArErr, setTitleArErr] = useState('');
    const [descriptionArErr, setdescriptionArErr] = useState('');
    const [descriptionEnErr, setdescriptionEnErr] = useState('');

    const handleButton = () => {
        Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    };

    const update = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title_en', titleEn);
        data.append('title_ar', titleAr);
        data.append('image', image);
        data.append('description_en', descriptionEn);
        data.append('description_ar', descriptionAr);

        try {
            await Axios.post(`http://localhost:8000/api/group-therapy/${props.id}?_method=PUT`, data)
                .then((response) => {
                    console.log(response.data);
                    setRender(prev => !prev);
                    handleButton();
                })
        } catch (error) {
            if (error.response) {
                setTitleArErr(error.response.data.errors.title_ar)
                setTitleEnErr(error.response.data.errors.title_en)
                setdescriptionEnErr(error.response.data.errors.description_en)
                setdescriptionArErr(error.response.data.errors.description_ar)
            }

        }
    }



    return (
        <div className="sessionmodal" >
            <form style={{ display: "grid", gridTemplateColumns: "1fr", alignItems: "center", paddingBottom: "2%" }}>
                {titleEnErr ? <div style={{ color: "red" }}>{titleEnErr}</div> : ""}
                <input style={{ margin: "3% auto" }} value={titleEn} type="text" placeholder="new English Title " onChange={(e) => {
                    setTitleEn(e.target.value)
                }} />
                <div style={{ color: "red" }}>{titleArErr}</div>
                <input style={{ margin: "3% auto" }} value={titleAr} type="text" placeholder="new Arabic Title " onChange={(e) => {
                    setTitleAr(e.target.value)
                }} />
                <input style={{ margin: "3% auto" }} type="file" onChange={(e) => {
                    setImage(e.target.files[0])
                }} />
                {descriptionEnErr ? <div style={{ color: "red" }}>{descriptionEnErr}</div> : ""}
                <input style={{ margin: "3% auto" }} value={descriptionEn} type="text" placeholder="new English description " onChange={(e) => {
                    setDescriptionEn(e.target.value)
                }} />
                <div style={{ color: "red" }}>{descriptionArErr}</div>
                <input style={{ margin: "3% auto" }} value={descriptionAr} type="text" placeholder="new Arabic description " onChange={(e) => {
                    setDescriptionAr(e.target.value)
                }} />
                <input type="submit" value="update" style={{ width: "15%", padding: "1%", margin: "0 auto" }} onClick={(id) => { update(id) }} />
            </form>

        </div>
    );
}
export default SessionModal;