import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './includes/Header';
import "./styles/FindConnections.css";
import {proxy} from '../../package.json';

const FindConnections = () => {
    const navigate = useNavigate();
    const [searchDataUser, setSearchDataUser] = useState(null);
    const [searchDataPage, setSearchDataPage] = useState(null);
    const [loginid, setLoginId] = useState('');

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setLoginId(localStorage.getItem("userId"));
        } else {
            navigate("/Login");
        }
    }, []);

    const submitSearch = (e) => {
        let s = e.target.value;
        if (!e.target.value) {
            setSearchDataUser(null);
            setSearchDataPage(null);
            return;
        }
        Axios.get( proxy+"/searchUser", { params: { searchVal: s, loginid: loginid } }).then((response) => {
            console.log(response)
            if (response.data.result.length > 0)
                setSearchDataUser(response.data.result);
            else setSearchDataUser(null)
            if (response.data.result1.length > 0)
                setSearchDataPage(response.data.result1);
            else setSearchDataPage(null)
        });
    }
    return (
        <>
            <Header />
            <div className='findconnections'>
                <div className='searchBox'>
                    <div className='inlineSearchBtn'>
                        <input type="text" className="inputSearch" placeholder="Search..." onChange={submitSearch} />
                    </div>
                </div>
                <div className='searchResult'>
                    <h1 style={{ "textAlign": "center", "padding": "8px 0px", "borderBottom": "1px solid rgba(0,0,0,0.5)" }}>Search Result</h1>
                    {searchDataUser && searchDataUser.map((obj) => (
                        <div className="userRow" key={obj.id}>
                            <Link to={"/Profile/" + obj.id}>
                                <img src={'http://localhost:3001' + obj.profile_pic} alt='Profile' width="80px" className='searchDataProfile' />
                                <h3>{obj.fullname}</h3>
                            </Link>
                            <p>{obj.aboutu}</p>
                            <p>{obj.hobbies}</p>
                            <div className='clr'></div>
                        </div>
                    ))}
                    {searchDataPage && searchDataPage.map((obj) => (
                        <div className="userRow" key={obj.id}>
                            <Link to={"/Page/" + obj.id}><img src={'http://localhost:3001' + obj.logo} alt='Profile' width="80px" className='searchDataProfile' />
                                <h3>{obj.name}</h3></Link>
                            <p>{obj.type}</p>
                            <p>{obj.address}</p>
                            <p>{obj.phonenumbers}, {obj.emails}</p>
                            <div className='clr'></div>
                        </div>
                    ))}
                    {!searchDataUser && !searchDataPage ? <h1>No Data Found</h1> : ""}
                </div>
            </div>
        </>
    )
}

export default FindConnections;
