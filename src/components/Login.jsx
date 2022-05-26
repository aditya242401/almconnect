import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './styles/Login.css';
import Header from './includes/Header';
import Footer from './includes/Footer';
import user from "../images/user.png";
import {proxy} from '../../package.json';

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginStatus,setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const login = (e) => {
        e.preventDefault();
        
        Axios.post( proxy+"/login", {
            email:email,
            password:password
        }).then((response)=>{
            if(response.data.message){
                setLoginStatus("Wrong Email or Password");
            } else {
                localStorage.setItem("userId",response.data[0].id);
                navigate("/Home");
            }
        });
    };

    useEffect(()=>{
        if(localStorage.getItem("userId")){
            navigate("/Home");
        }
    },[])

    return (
        <>
        <Header />
        <div className="wrapperLogin">
            <div className="boxLogin" style={{"width": "450px"}}>
                <div className="headerBoxLogin">
                    <h1>LOGIN NOW</h1>
                </div>
                <form method='post' action='' onSubmit={login}>
                    <div className="footerBoxLogin">
                        <p className="dangerMsg">{loginStatus}</p>
                        <center><img src={user} width="40%" className="imgUser"/></center>
                        <input type="email" className="login-input" placeholder="Email" onChange={(e)=>{ setEmail(e.target.value); }} required autoFocus/>
                        <input type="password" className="login-input" placeholder="Password" onChange={(e)=>{ setPassword(e.target.value); }} required/>
                        <p className="mt-1"><input type="checkbox"/> Remember Me!</p>
                        <button type="submit" className="loginBtn"><i className="far fa-sign-in"></i> SIGN IN</button>
                        <p className="mt-2" style={{"float":"left"}}>Forgot Password <Link style={{"color":"blue"}} to="/ForgotPassword">Click Here</Link></p>
                        <p className="mt-2" style={{"float":"right"}}>Not Registered! <Link style={{"color":"blue"}} to="/Signup">Click Here</Link></p>
                        <div className='clr'></div>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Login;