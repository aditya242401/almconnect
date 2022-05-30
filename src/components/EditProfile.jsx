import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './includes/Footer'
import Header from './includes/Header'
import {proxy} from '../../package.json';
import { CircularProgress, Backdrop } from '@mui/material';
import { toast } from 'react-toastify';

function EditProfile() {
    const navigate = useNavigate();
    const [userInfo,setUserinfo] = useState({fullname: '', aboutu: '', hobbies: ''});
    const [userEducations,setUserEducations] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("userId")){
            setLoading(true);
            let loginid = localStorage.getItem("userId");
            // Set Login Data
            Axios.get( proxy+"/getDataById",{ params: {loginid:loginid} }).then((response)=>{
                setUserinfo(response.data[0]);
            });
            Axios.get( proxy+"/getUserEducations",{ params: {loginid:loginid} }).then(response=>{
                if(response.data.length>0)
                    setUserEducations(response.data);
                setLoading(false);
            });
        } else {
            navigate("/Login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleEdit = (e)=>{
        let name = e.target.id;

        setUserinfo((prevValue)=>{
            return {
                ...prevValue,
                [name]: e.target.value
            }
        });
    }
    const editProfileFun = async (e)=>{
        e.preventDefault();
        setLoading(true);
        let loginid = localStorage.getItem("userId");
        const response = await Axios.post(proxy+"/uploadProfileDetails", {fullname: userInfo.fullname,aboutu: userInfo.aboutu,hobbies:userInfo.hobbies, loginid: loginid});
        if(response.status===200){
            toast.success(response.data.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Header/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="edit-profile m-5">
                <div className="box">
                    <div className='boxHeader mb-2'>
                    <Link to="/Profile"><i className='fas fa-arrow-left'></i> Back</Link>
                        <h1>Edit Your Profile</h1>
                    </div>
                    <div className='boxBody'>
                        <form action="" method="post" onSubmit={editProfileFun}>
                            <p><label htmlFor='fullname'>Full Name : </label>
                            <input type="text" value={userInfo.fullname} id='fullname' onChange={handleEdit}/></p>
                            <p><label htmlFor='editaboutu'>About You : </label>
                            <textarea id='aboutu' onChange={handleEdit} value={userInfo.aboutu} rows="4"></textarea></p>
                            <p><label htmlFor='fullname'>Full Name : </label>
                            <input type="text" value={userInfo.hobbies} id='hobbies' onChange={handleEdit}/></p>
                            <h2>Education : </h2>
                            {
                                userEducations.map((obj,i)=>{
                                    return (
                                    <div key={i} style={{'padding':'10px'}}>
                                        <h3>{obj.school}</h3>
                                        <p>{obj.degree}, {obj.fieldofstudy}</p>
                                        <p>{new Date(obj.startdate).getFullYear()} - {new Date(obj.enddate).getFullYear()}</p>
                                    </div>
                                    )
                                })
                            }
                            <Link to="/AddEducation"><button className='btn'>Add Education</button></Link><br/><br/>
                            <p><input type="submit" value="Update" className='btn'/></p>
                        </form>
                    </div>
                    <div className='boxFooter'></div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default EditProfile
