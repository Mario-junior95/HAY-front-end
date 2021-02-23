import React,{useState , useEffect} from 'react';
import Axios from 'axios';
import Swal from "sweetalert2";


const AddContent = (props) => {
    const {setRender} = props.render;

    const [missiontitleAr , setMissionTitleAr] = useState('')
    const [missionAr , setMissionAr] = useState('')
    const [missiontitleEn , setMissionTitleEn] = useState('')
    const [missionEn , setMissionEn] = useState('')
    const [visiontitleAr , setvisionTitleAr] = useState('')
    const [visionAr , setvisionAr] = useState('')
    const [visiontitleEn , setvisionTitleEn] = useState('')
    const [visionEn , setvisionEn] = useState('');
    const [ missionTitleEnErr , setMissionTitleEnErr] = useState('');
    const [ missionTitleArErr , setMissionTitleArErr] = useState('');
    const [ missionArErr , setMissionArErr] = useState('');
    const [ missionEnErr , setMissionEnErr] = useState('');
    const [ visionArErr , setvisionArErr] = useState('');
    const [ visionEnErr , setvisionEnErr] = useState('');
    const [ visionTitleEnErr , setvisionTitleEnErr] = useState('');
    const [ visionTitleArErr , setvisionTitleArErr] = useState('');

    const handleButton = () => {
        Swal.fire("Added Successfully!", "You clicked the button!", "success");
    };

    const handleSend = async(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('missions_title_ar',missiontitleAr);
        data.append('missions_ar',missionAr);
        data.append('missions_title_en',missiontitleEn);
        data.append('missions_en',missionEn);
        data.append('visions_title_ar',visiontitleAr);
        data.append('visions_ar',visionAr);
        data.append('visions_title_en',visiontitleEn);
        data.append('visions_en',visionEn);
        try{
           await Axios.post('http://localhost:8000/api/home' , data)
            .then((response)=>{
                console.log(response.data);
                setRender(prev => !prev);
                handleButton();
            })
        }catch (error) {
            if(error.response){
                setMissionTitleEnErr(error.response.data.errors.missions_title_en);
                setMissionTitleArErr(error.response.data.errors.missions_title_ar);
                setMissionArErr(error.response.data.errors.missions_ar);
                setMissionEnErr(error.response.data.errors.missions_en);
                setvisionArErr(error.response.data.errors.visions_ar);
                setvisionEnErr(error.response.data.errors.visions_en);
                setvisionTitleEnErr(error.response.data.errors.visions_title_en);
                setvisionTitleArErr(error.response.data.errors.visions_title_ar); 
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
                            <form className="Signup-form">
                            {missionTitleEnErr ? <div style={{ color: "red" }}>{missionTitleEnErr}</div> : ""}
            <input type="text" placeholder="english mission title" onChange={(e)=>{
                setMissionTitleEn(e.target.value);
            }}/>
            {missionEnErr ? <div style={{ color: "red" }}>{missionEnErr}</div> : ""}
            <textarea placeholder="english mission paragraph" onChange={(e)=>{
                setMissionEn(e.target.value);
            }}></textarea>
<hr></hr>
<hr></hr>
            {missionTitleArErr ? <div style={{ color: "red" }}>{missionTitleArErr}</div> : ""}

            <input type="text" placeholder="Arabic mission title" onChange={(e)=>{
                setMissionTitleAr(e.target.value);
            }}/>
            {missionArErr ? <div style={{ color: "red" }}>{missionArErr}</div> : ""}

            <textarea placeholder="Arabic mission paragraph" onChange={(e)=>{
                setMissionAr(e.target.value);
            }}></textarea>
            <hr></hr>
            <hr></hr>

            {visionTitleEnErr ? <div style={{ color: "red" }}>{visionTitleEnErr}</div> : "" }

            <input type="text" placeholder="english vision title" onChange={(e)=>{
                setvisionTitleEn(e.target.value);
            }}/>
            {visionEnErr ? <div style={{ color: "red" }}>{visionEnErr}</div> : "" }
            
            <textarea placeholder="english vision paragraph" onChange={(e)=>{
                setvisionEn(e.target.value);
            }}></textarea>
            <hr></hr>
            <hr></hr>

            {visionTitleArErr ? <div style={{ color: "red" }}>{visionTitleArErr}</div> : "" }

            <input type="text" placeholder="Arabic vision title" onChange={(e)=>{
                setvisionTitleAr(e.target.value);
            }}/>
            {visionArErr ? <div style={{ color: "red" }}>{visionArErr}</div> : "" }


            <textarea placeholder="Arabic vision paragraph" onChange={(e)=>{
                setvisionAr(e.target.value);
            }}></textarea>

                            </form>
                            <input type="submit" value="Add" onClick={handleSend}/>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddContent
