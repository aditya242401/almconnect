import { useState } from 'react';
import Axios from 'axios';
import Header from './includes/Header';
import Footer from './includes/Footer';
import { Link, useNavigate } from 'react-router-dom';
import {proxy} from '../../package.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [address, setAddress] = useState('');
    const [aboutu, setAboutu] = useState('');
    const [hobbies, setHobbies] = useState('');

    const handleDob = (e) => {
        setGender(e.target.value);
    }

    const register = (e) => {
        e.preventDefault();
        if (password === rePassword) {
            Axios.post( proxy+"/register", {
                loginid: Math.floor(Date.now() * Math.random()),
                fullname: fullname,
                dob: dob,
                gender: gender,
                mobile: mobile,
                email: email,
                password: password,
                rePassword: rePassword,
                address: address,
                aboutu: aboutu,
                hobbies: hobbies
            }).then((response) => {
                if (response.data.message) {
                    toast.success("Account Created Successfully!!!");
                    navigate("/Login");
                }
            });
        } else {
            toast.error("Both the Passwords are not mached!!!");
        }
    };

    return (
        <>
            <Header />
            <div className="wrapperSignup">
                <div className="boxSignup">
                    <div className="headerBoxSignup">
                        <h1>Create a new Account </h1>
                    </div>

                    <div className="footerBoxSignup">
                        <form method='post' onSubmit={register}>
                        <input type="text" className="login-input" placeholder="Fullname" onChange={(e) => { setFullname(e.target.value); }} required autoFocus />
                        <p className='spanLoginText' style={{ "marginBottom": "-5px" }}>Date Of Birth :</p><input type="date" className="login-input" onChange={(e) => { setDob(e.target.value); }} required />
                        <p className='spanLoginText'>Gender : <input type="radio" className="login-input-radio" name="gender" value="Male" onChange={handleDob} /> Male <input type="radio" className="login-input-radio" name="gender" value="Female" onChange={handleDob} /> Female <input type="radio" className="login-input-radio" name="gender" value="Others" onChange={handleDob} /> Others</p>
                        <input type="text" className="login-input" placeholder="Mobile Number" maxlength="10" onChange={(e) => { setMobile(e.target.value); }} required />
                        <input type="email" className="login-input" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} required />
                        <input type="password" className="login-input" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} required />
                        <input type="password" className="login-input" placeholder="Re Type Password" onChange={(e) => { setRePassword(e.target.value); }} required />
                        <textarea className='login-textarea' placeholder="Address" rows='3' onChange={(e) => { setAddress(e.target.value); }}></textarea>
                        <input type="text" className="login-input" placeholder="About You" onChange={(e) => { setAboutu(e.target.value); }} />
                        <input type="text" className="login-input" placeholder="Hobbies" onChange={(e) => { setHobbies(e.target.value); }} />

                        <button type="submit" className='signupBtn'>Sign Up</button>
                        <p style={{ "marginTop": "10px" }}>Already Registered ? <Link style={{ "color": "blue" }} to="/Login">Login Now</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default Signup;