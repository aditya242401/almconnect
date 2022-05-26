import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import user from '../../images/user.png';
import "./AdminIndex.css";

const AdminIndex = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg,setMsg] = useState('');

    useEffect(() => {
        if(localStorage.getItem("adminloginid")){
            navigate("/Admin/Home");
        }
    }, []);

    const submit = ()=>{
        Axios.post("http://localhost:3001/adminlogin",{username:username,password:password}).then((response)=>{
            if(!response.data.message){
                localStorage.setItem("adminloginid",response.data[0].username);
                navigate("/Admin/Home");
            } else {
                setMsg(response.data.message);
            }
        })
    }

    return (
        <div className='adminindex'>
            <div className='box'>
                <div className='boxheader'>
                    <h1>ADMIN LOGIN</h1>
                </div>
                <div className='boxbody'>
                    <center><img src={user} width="50%" className="imgUser" /></center>
                    <p className='dangerMsg'>{msg}</p>
                    <input type="text" className='text-input' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <input type="password" className='text-input' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button className='loginbtn' onClick={submit}>LOGIN</button>
                </div>
                <div className='boxfooter'>
                    <Link to="../">Back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminIndex;
