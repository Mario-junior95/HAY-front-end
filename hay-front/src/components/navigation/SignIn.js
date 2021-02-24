import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from "sweetalert2";



const SignIn = (props) => {
    const { setRender } = props.render;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('')


    const handleReset = () => {
        setEmail('')
        setPassword('')
    }

    const handleButton = () => {
        Swal.fire("Successfully Logged In!", "You clicked the button!", "success");
    };


    const login = async (e) => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        e.preventDefault();
        try {
            await Axios.post('http://localhost:8000/api/login', data, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('id', response.data.user.id);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('name', response.data.user.name);
                    localStorage.setItem('interests', response.data.user.interests);
                    localStorage.setItem('occupation', response.data.user.occupation);
                    localStorage.setItem('education', response.data.user.education);
                    setToken(response.data.access_token);
                    setRender(prev => !prev);
                    handleReset();
                    handleButton();
                    if (response.data.user.image) {
                        localStorage.setItem('image', response.data.user.image);

                    } else {
                        localStorage.setItem('image', 'avatar.png');

                    }


                })
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                 setEmailErr(error.response.data.errors.email);
                setPasswordErr(error.response.data.errors.password);

            }
            // else if (error.response.data.errors) {
            //     setError(error.response.data.errors[0] + error.response.data.errors[1] + error.response.data.errors[2] + error.response.data.errors[3] + error.response.data.errors[4] + error.response.data.errors[5] + error.response.data.errors[6] + error.response.data.errors[7] + error.response.data.errors[8] + error.response.data.errors[9] + error.response.data.errors[10] + error.response.data.errors[11]);
            // }
        }
    }

    return (
        <div>
            <div className="modal fade" id="myModal1" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div style={{ color: "red" }}>{error}</div>
                                <div style={{ color: "red" }}>{emailErr}</div>
                                <input value={email} type="text" placeholder="email" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                                <div style={{ color: "red" }}>{passwordErr}</div>
                                <input value={password} type="password" placeholder="password" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                                <button className="signinbtn" id="signin" style={{ width: "90px", borderRadius: "15px" }} onClick={login}>Submit</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn
