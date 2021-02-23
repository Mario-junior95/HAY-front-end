import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from "sweetalert2";


const ProfileUpdateInfo = (props) => {
    const { setRender } = props.renderr;


    const [newName, setNewName] = useState(localStorage.getItem('name'));
    const [newEducation, setNewEducation] = useState(localStorage.getItem('education'));
    const [newOccupation, setNewOccupation] = useState(localStorage.getItem('occupation'));
    const [newInterests, setNewInterests] = useState(localStorage.getItem('interests'));
    const [newImage, setNewImage] = useState('empty');
    const [nameErr , setNameErr] = useState('');
    const [EducationErr , setEducationErr] = useState('');
    const [OccupationErr , setOccupationErr] = useState('');
    const [InterestsErr , setInterestsErr] = useState('');


    const handleButton = () => {
        Swal.fire("Updated Successfully!", "You clicked the button!", "success");
    };

    const handleChange = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', newName);
        data.append('education', newEducation);
        data.append('occupation', newOccupation);
        data.append('interests', newInterests);
        data.append('image', newImage);


        try {
            await Axios.post(`http://localhost:8000/api/update-user/${localStorage.getItem('id')}?_method=PUT`, data, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('image', newImage);
                    localStorage.setItem('name', newName);
                    localStorage.setItem('interests', newInterests);
                    localStorage.setItem('occupation', newOccupation);
                    localStorage.setItem('education', newEducation);
                    setRender(prev => !prev)
                    handleButton();
                })
        } catch (error) { 
            if (error.response) {
                setNameErr(error.response.data.errors.name)
                setEducationErr(error.response.data.errors.education)
                setOccupationErr(error.response.data.errors.occupation)
                setInterestsErr(error.response.data.errors.interests)
            }
        }
    }


    return (
        <div>
            <div className="modal fade" id="myModal3" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div style={{color:"red"}}>{nameErr}</div>
                                <input value={newName ? newName : ""} type="text" placeholder="Edit your name" onChange={(e) => {
                                    setNewName(e.target.value)
                                }} /> <input type="file" onChange={(e) => {
                                    setNewImage(e.target.files[0])
                                }} /><br></br>
                                <br></br>
                                <div style={{color:"red"}}>{EducationErr}</div>
                                <textarea style={{ width: "85%" }} value={newEducation ? newEducation : ""} placeholder="Edit your Education" onChange={(e) => {
                                    setNewEducation(e.target.value)
                                }} ></textarea><br></br>
                                <div style={{color:"red"}}>{OccupationErr}</div>
                                <textarea style={{ width: "85%" }} value={newOccupation ? newOccupation : ""} placeholder="Edit your Occupation" onChange={(e) => {
                                    setNewOccupation(e.target.value)
                                }} ></textarea><br></br>
                                <div style={{color:"red"}}>{InterestsErr}</div>
                                <textarea style={{ width: "85%" }} value={newInterests ? newInterests : ""} placeholder="Edit your Interests" onChange={(e) => {
                                    setNewInterests(e.target.value)
                                }} ></textarea><br></br>

                                <button id="signin" style={{ width: "90px", borderRadius: "15px" }} onClick={handleChange}>Update</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="signin" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileUpdateInfo
