import React, { useState } from 'react';
import Axios from 'axios';
import Swal from "sweetalert2";


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [age, setAge] = useState('');
    const [area, setArea] = useState('');
    const [occupation, setOccupation] = useState('');
    const [education, setEducation] = useState('');
    const [password, setPassword] = useState('');
    const [interests, setInterests] = useState('');

    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [phoneErr, setPhoneErr] = useState('');
    const [ageErr, setAgeErr] = useState('');
    const [areaErr, setAreaErr] = useState('');
    const [occupationErr, setOccupationErr] = useState('');
    const [educationErr, setEducationErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [interestsErr, setInterestsErr] = useState('');

    const handleButton = () => {
        Swal.fire("Successfully Registered!", "You clicked the button!", "success");
    };

    const handleReset = () => {
        setName('')
        setEmail('')
        setPhone('')
        setAge('')
        setArea('')
        setOccupation('')
        setEducation('')
        setPassword('')
        setInterests('')
    }


    const Register = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('phone', phone);
        data.append('image', image);
        data.append('age', age);
        data.append('area', area);
        data.append('occupation', occupation);
        data.append('education', education);
        data.append('password', password);
        data.append('interests', interests);
        try {
            await Axios.post('http://localhost:8000/api/register', data, {
                headers: {
                    'content-type': 'multipart/form-data',

                },
            })
                .then((response) => {
                    console.log(response.data)
                    handleReset();
                    handleButton();
                })

        } catch (error) {
            if (error.response) {
                setNameErr(error.response.data.errors.name);
                setEmailErr(error.response.data.errors.email);
                setPhoneErr(error.response.data.errors.phone);
                setAgeErr(error.response.data.errors.age);
                setAreaErr(error.response.data.errors.area);
                setOccupationErr(error.response.data.errors.occupation);
                setEducationErr(error.response.data.errors.education);
                setPasswordErr(error.response.data.errors.password);
                setInterestsErr(error.response.data.errors.interests);
            }
        }
    }


    return (
        <div>
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form className="Signup-form" style={{ display: "grid", gridTemplateColumns: "1fr" }}>


                                <div style={{ color: "red" }}>{nameErr}</div>
                                <input value={name} id="name" type="text" style={{ margin: "2% auto", width: "85%" }} placeholder="Name" onChange={(e) => {
                                    setName(e.target.value);
                                }} />

                                <div style={{ color: "red" }}>{emailErr}</div>
                                <input value={email} id="email" type="text" style={{ margin: "2% auto", width: "85%" }} placeholder="Email" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />

                                <div style={{ color: "red" }}>{phoneErr}</div>
                                <input value={phone} id="phone" type="text" style={{ margin: "2% auto", width: "85%" }} placeholder="Phone" onChange={(e) => {
                                    setPhone(e.target.value);
                                }} />


                                <input id="image" type="file" style={{ margin: "2% auto", width: "85%" }} onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }} />

                                <div style={{ color: "red" }}>{ageErr}</div>
                                <input value={age} id="age" type="number" style={{ margin: "2% auto", width: "85%" }} placeholder="Age" onChange={(e) => {
                                    setAge(e.target.value);
                                }} />

                                <div style={{ color: "red" }}>{occupationErr}</div>
                                <textarea value={occupation} id="occupation" style={{ margin: "2% auto", width: "85%" }} type="text" placeholder="Occupations" onChange={(e) => {
                                    setOccupation(e.target.value);
                                }}></textarea>

                                <div style={{ color: "red" }}>{educationErr}</div>
                                <textarea value={education} id="education" style={{ margin: "2% auto", width: "85%" }} type="text" placeholder="Education" onChange={(e) => {
                                    setEducation(e.target.value);
                                }}></textarea>

                                <div style={{ color: "red" }}>{areaErr}</div>
                                <input value={area} id="area" type="text" style={{ margin: "2% auto", width: "85%" }} style={{ margin: "0 auto" }} placeholder="Area" onChange={(e) => {
                                    setArea(e.target.value);
                                }} />

                                <div style={{ color: "red" }}>{interestsErr}</div>
                                <textarea value={interests} id="interests" style={{ margin: "2% auto", width: "85%" }} placeholder="Interests" onChange={(e) => {
                                    setInterests(e.target.value);
                                }}></textarea>

                                <div style={{ color: "red" }}>{passwordErr}</div>
                                <input value={password} id="password" style={{ margin: "2% auto", width: "85%" }} type="password" placeholder="password" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />

                                <button id="signin" style={{ width: "120px", margin: "2% auto", borderRadius: "15px" }} onClick={Register}>Submit</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" id="signin" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp
