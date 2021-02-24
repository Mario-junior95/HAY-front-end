import React,{useState} from 'react';
import Axios from 'axios';

const ChangePass = () => {
    const [ pass , setPass] = useState('');
    const [confirmPass , setConfirmPass] = useState('');
    const [passErr , setPassErr] = useState('');
    const [status , setStatus] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (!pass && !confirmPass) {
            setPassErr("Passwords didn't match!");
        } else if (pass !== confirmPass) {
            setPassErr("Passwords didn't match!")
        }
        else {
            const data = new FormData();
            data.append('password', pass);
            try {
                Axios.post(`http://localhost:8000/api/update-password/${localStorage.getItem('id')}?_method=PUT`, data, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': "Bearer " + localStorage.getItem('token')
                    }

                })
                    .then((response) => {
                        console.log(response.data);
                        localStorage.getItem('token');
                        setStatus('Password has been Changed!')
                        setPassErr('');
                    })
            } catch (err) { 
               console.log(err)
             }
        }
    }

    return (
        <div>
            <form>

           

                <div className="modal fade" id="myModal4" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <center>
                            {status ? <div style={{ width: "64%" }} className="alert alert-success">{status}</div> : ""}
                            {passErr ? <div style={{width:"64%"}} className="alert alert-danger">{passErr}</div> : ""}

                            <input type="password" placeholder="new password" onChange={(e)=>{
                    setPass(e.target.value)
                }}/>
                <input type="password" placeholder="confirm new password" onChange={(e)=>{
                    setConfirmPass(e.target.value)
                }}/>
                <button className="editprofile" id="signin" style={{width:"90px" , borderRadius:"15px"}} onClick={handleChange}>Submit</button>

                            </center>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>

                </div>
            </div>

            </form>
        </div>
    )
}

export default ChangePass