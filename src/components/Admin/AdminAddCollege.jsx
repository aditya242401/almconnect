import Axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Admin.css";

function AdminAddCollege() {
    const [formData, setformData] = useState({
        collegeName: "",
        collegeAddress: ""
    });

    // Save File Code
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleInput = (e)=>{
        const {name, value} = e.target;
        setformData((preValue)=>{
            return{
                ...preValue,
                [name]: value,
            }
        });
    }
    const addCollege = ()=>{
        const formData1 = new FormData();
        formData1.append("file", file);
        formData1.append("fileName", fileName);
        formData1.append("collegeName",formData.collegeName);
        formData1.append("collegeAddress",formData.collegeAddress);

        Axios.post("http://localhost:3001/addcollege", formData1).then((response)=>{
            if(response.data){
                alert("College Add Successfully.");
                window.location.reload();
            }
        });
    }
    
    return (
        <div className='AdminAddCollege'>
            <div className='box'>
                <Link to="/Admin">Back to home</Link>
                <h1>Add College</h1>
                <input type="text" className='text-input' placeholder="College Name" name="collegeName" onChange={handleInput} required/>
                <input type="text" className="text-input" placeholder="College Address" name="collegeAddress" onChange={handleInput} required/>
                <input type="file" onChange={saveFile} className='file-input' name='file' required/>
                <button className='addCollegeBtn' onClick={addCollege}>Add College</button>
            </div>
        </div>
    )
}

export default AdminAddCollege
