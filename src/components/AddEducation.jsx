import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './includes/Footer'
import Header from './includes/Header'
import { proxy } from "../../package.json";

function AddEducation() {
    const navigate = useNavigate();
    const [userInfo,setUserinfo] = useState({});
    const [educationDetail,setEducationDetail] = useState({});
    const [colleges, setColleges] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("userId")){
            let loginid = localStorage.getItem("userId");
            // Set Login Data
            Axios.get(proxy+"/getDataById",{ params: {loginid:loginid} }).then((response)=>{
                setUserinfo(response.data[0]);
            });
            // 
            Axios.get(proxy+"/getcolleges").then((response)=>{
                setColleges(response.data);
            });
        } else {
            navigate("/Login");
        }
    },[]);

    const handleInput = (e)=>{
        const {name,value} = e.target;

        setEducationDetail((prevVal)=>{
            return {
                ...prevVal,
                [name]: value
            }
        });
    }
    const addEducationFun = (e)=>{
        e.preventDefault();
        Axios.post(proxy+"/addEducation",{userid:userInfo.id,educationDetail: educationDetail}).then(response=>{
            console.log(response);
        });
    }
    return (
        <>
            <Header/>   
            <div className="add_education m-5">
                <Link to="/EditProfile"><i className='fas fa-arrow-left'></i> Back</Link>
                <h1>Add Education :- </h1>
                <form action="" method="post" onSubmit={addEducationFun}>
                    <p><label>School* : </label>
                    {/* <input type="text" name="school" onChange={handleInput}/> */}
                    <select name='school' onChange={handleInput}>
                        {
                            colleges.map((ele,index)=>{
                                return (
                                    <option key={index} value={ele.name}>{ele.name}</option>
                                )
                            })
                        }   
                    </select>
                    </p>
                    <p><label>Degree* : </label><input type="text" name="degree" onChange={handleInput}/></p>
                    <p><label>Field Of Study* : </label><input type="text" name="fieldofstudy" onChange={handleInput}/></p>
                    <p><label>Start Date* : </label><input type="date" name="startdate" onChange={handleInput}/></p>
                    <p><label>End Date (Or Expected)* : </label><input type="date" name="enddate" onChange={handleInput}/></p>
                    <p><label>Description : </label>
                        <textarea name="description" rows="4" onChange={handleInput}></textarea>
                    </p>
                    <input type="submit" value="Add Education" />
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default AddEducation