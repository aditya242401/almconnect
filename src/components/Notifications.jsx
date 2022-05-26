import Axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './includes/Header';
import Footer from './includes/Footer';
import "./styles/Notifications.css";
import {proxy} from '../../package.json';

const Notifications = () => {
    const navigate = useNavigate();
    const [notiData, setNotiData] = useState(null);
    const [loginid, setLoginId] = useState('');
    const [notiPostData, setNotiPostData] = useState(null);
    const [flag, setFlag] = useState(null);

    const getPostNotifications = (data) => {
        let tempData = {}
        data.map(ele => {
            if (ele.noti_text === "NewPost" ) {
                Axios.get( proxy+"/getUserFollowStatus", { params: { user1: localStorage.getItem("userId"), user2: ele.userid_from } }).then((response) => {
                    if (response.data.length > 0 && flag==null) {
                        if(response.data[0].createdat < ele.datetime){
                            console.log("Abc");
                            tempData[ele.id] = true;
                        }
                    }
                })
                Axios.get( proxy+"/getUserFollowStatus", { params: { user2: localStorage.getItem("userId"), user1: ele.userid_from } }).then((response) => {
                    if (response.data.length > 0 && flag==null) {
                        if(response.data[0].createdat < ele.datetime){
                            tempData[ele.id] = true;
                            console.log("Abc");
                            setFlag(true)
                        }
                    }
                })
            }
        })
        setNotiPostData(tempData);
    }

    const getNotifications = () => {
        Axios.get( proxy+"/getNotifications", { params: { loginid: localStorage.getItem("userId") } }).then((response) => {
            if (response.data.length > 0) {
                getPostNotifications(response.data)
                setNotiData(response.data);
            }
        });
    }

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setLoginId(localStorage.getItem("userId"));
            if (flag == null)
                getNotifications()
        } else {
            navigate("/Login");
        }
        return () => {
            
        }
    }, [flag]);

    // Function For Format The Date
    const formatDate = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = days[date.getDay()] + ' ' + hours + ':' + minutes + ' ' + ampm;

        return strTime;
    }

    const acceptFriendRequest = (userid_from) => {
        Axios.post( proxy+"/acceptFriendRequest", { userid_from: userid_from, userid_to: loginid }).then(response => {
            getNotifications()
        });
    }

    const deleteFriendRequest = (userid_from) => {
        Axios.post( proxy+"/deleteFriendRequest", { userid_from: userid_from, userid_to: loginid }).then(response => {
            getNotifications()
        });
    }

    const seePost = (id) => {
        Axios.post( proxy+"/setPostStatusNotification", { noti_id: id }).then(response => {
            getNotifications()
        });
    }

    const allNotificationsFun = (obj) => {
        if (obj.noti_text === "FollowRequest" && obj.status === "Unread") {
            return (
                <>
                    <div className='divUnread'>
                        <div style={{ "display": "flex" }}>
                            <img src={ proxy+obj.profile_pic} height={35} />
                            <div style={{ "marginLeft": "5px" }}>
                                <p><Link style={{ "color": "blue" }} to={"/Profile/" + obj.userid_from}><b>{obj.fullname}</b></Link> Requested To Connect With You. </p>
                                <p>{formatDate(new Date(obj.datetime))}</p></div>
                        </div>
                        <button className='acceptFriendRequest' onClick={() => { acceptFriendRequest(obj.userid_from) }}>Accept</button>
                        <button className='deleteFriendRequest' onClick={() => { deleteFriendRequest(obj.userid_from) }}>Delete</button>
                    </div>
                </>
            )
        } else if (obj.noti_text === "FollowRequest" && obj.status === "Read") {
            return (
                <>
                    <div className='divRead'>
                        <div style={{ "display": "flex" }}>
                            <img src={ proxy+obj.profile_pic} height={35} />
                            <div style={{ "marginLeft": "5px" }}>
                                <p><Link style={{ "color": "blue" }} to={"/Profile/" + obj.userid_from}><b>{obj.fullname}</b></Link> Requested To Connect With You. </p>
                                <p>{formatDate(new Date(obj.datetime))}</p></div>
                        </div>
                        <button className='acceptFriendRequest'>Accepted</button>
                    </div>
                </>
            )
        } else if (obj.noti_text === "NewPost" && obj.status === "Unread" && localStorage.getItem("userId") != obj.userid_from) {
            if (notiPostData[obj.id] && notiPostData[obj.id] == true) {
                return (
                    <>
                        <div className='divUnread'>
                            <div style={{ "display": "flex" }}>
                                <img src={ proxy+obj.profile_pic} height={35} />
                                <div style={{ "marginLeft": "5px" }}>
                                    <p><Link style={{ "color": "blue" }} to={"/Profile/" + obj.userid_from}><b>{obj.fullname}</b></Link> Update his new Post. </p>
                                    <p>{formatDate(new Date(obj.datetime))}</p></div>
                            </div>
                            <button onClick={ () => seePost(obj.id)} className='acceptFriendRequest'>See Post</button>
                        </div>
                    </>
                )
            }
        } else if (obj.noti_text === "NewPost" && obj.status === "Read" && localStorage.getItem("userId") != obj.userid_from) {
            if (notiPostData[obj.id] && notiPostData[obj.id] == true) {
                return (
                    <>
                        <div className='divRead'>
                            <div style={{ "display": "flex" }}>
                                <img src={ proxy+obj.profile_pic} height={35} />
                                <div style={{ "marginLeft": "5px" }}>
                                    <p><Link style={{ "color": "blue" }} to={"/Profile/" + obj.userid_from}><b>{obj.fullname}</b></Link> Update his new Post. </p>
                                    <p>{formatDate(new Date(obj.datetime))}</p></div>
                            </div>
                            <button onClick={ () => navigate("/Post/"+obj.userid_to) } className='acceptFriendRequest'>See Post</button>
                        </div>
                    </>
                )
            }
        }
    }

    const wrapperFun = notiData && notiData.map((obj, i) => {
        return (
            <div className='notificationsWrapper' key={i}>
                {allNotificationsFun(obj)}
            </div>
        );
    })
    return (
        <>
            <Header />
            <div className='notifications'>
                <div className='mainDiv'>
                    <Link to="/Home"><i className='fas fa-arrow-left'></i> Back</Link>
                    <h1>Notifications</h1>
                    {notiPostData != null ? wrapperFun : ""}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Notifications;
