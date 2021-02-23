import React,{useEffect, useState} from 'react'
import ChangePass from './ChangePass';
import ProfileUpdateInfo from './ProfileUpdateInfo'
import Avatar from '../../Images/avatar.png'

const ProfileModal = (props) => {

    const {setRender} = props.render;
    const [token , setToken] = useState(localStorage.getItem('token'))
    

    return (
        <div>
            <div className="modal fade" id="myModal2" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                          
                            <center>
                     
                           {localStorage.getItem('image') === 'avatar.png' ? <img style={{width:"25%"}} src={Avatar} alt="avatar"/> :<img style={{ width: "40%" }} src={`http://localhost:8000/storage/${localStorage.getItem('image')}`} alt="You have no Profile image" />}
                                <hr></hr>
                                <p><span style={{fontWeight:"bold"}}>Name :</span>{localStorage.getItem('name')}</p>
                                <p><span style={{fontWeight:"bold"}}>Occupation : </span>{localStorage.getItem('occupation')}</p>
                                <p><span style={{fontWeight:"bold"}}>Interesets : </span>{localStorage.getItem('interests')}</p>
                                <p><span style={{fontWeight:"bold"}}>Educations : </span>{localStorage.getItem('education')}</p>
            <div style={{display:"grid" , gridTemplateColumns:"1fr"}}>
            <button type="button" id="signin" style={{width:"50%" , margin:"0 auto"}} className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal3">Edit profile</button>
            <button type="button" id="signin" style={{width:"50%" , margin:"2% auto"}} className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal4">Edit Password</button>
            </div>

                            </center>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="signup" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
            <ProfileUpdateInfo renderr={{setRender}}/>
            <ChangePass/>
        </div>
    )
}

export default ProfileModal
