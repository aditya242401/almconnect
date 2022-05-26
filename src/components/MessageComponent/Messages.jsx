import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../includes/Footer'
import Header from '../includes/Header'
import "../styles/Messages.css";
import { proxy } from "../../../package.json";


const Messages = () => {
    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState({});
    const [friendinfo, setFriendinfo] = useState({});

    const messageRef = useRef();

    const param = useParams();
    const [messageUsers, setMessageUsers] = useState(null)
    const [messages, setMessages] = useState(null)
    const [scrollStatus, setScrollStatus] = useState(1);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            const loginid = localStorage.getItem("userId");
            Axios.get(proxy + "/getDataById", { params: { loginid: loginid } }).then((response) => {
                setUserinfo(response.data[0]);
            });
            if (param.id) {
                scrollToTop();
                Axios.get(proxy + "/getDataById", { params: { loginid: param.id } }).then((response) => {
                    setFriendinfo(response.data[0]);
                });
                getMessages(param.id, loginid)
            }
            getMessageUsers(loginid)
        } else {
            navigate("/Login");
        }
    }, [messages]);

    const scrollToTop = () => {
        if (scrollStatus <= 2) {
            document.getElementsByClassName("boxBody")[0].scrollTo({
                top: document.getElementsByClassName("boxBody")[0].scrollHeight,
                behavior: 'smooth'
            });
            setScrollStatus(scrollStatus + 1);
        }
    }

    const getMessageUsers = (loginid) => {
        Axios.get(proxy + "/getMessageUsers", { params: { loginid: loginid } }).then((response) => {
            if (response.data.length > 0)
                setMessageUsers(response.data);
        });
    }

    const getMessages = (id, loginid) => {
        Axios.get(proxy + "/getMessages", { params: { id, loginid } }).then(response => {
            if (response.data.length > 0) {
                if (messages && messages.length != response.data.length) {
                    setScrollStatus(1)
                }
                setMessages(response.data)
            }
        })
    }

    const sendMsg = (e) => {
        e.preventDefault();
        const msg = e.target[0].value;

        Axios.post(proxy + "/sendMessage", { sender: userinfo.id, reciever: friendinfo.id, msg }).then(response => {
            if (response.data) {
                getMessageUsers(userinfo.id)
                getMessages(friendinfo.id, userinfo.id);
                e.target[0].value = "";
                setScrollStatus(1)
            }
        })
    }

    return (
        <>
            <Header />
            <div className='messages'>
                <div className="innerMessages">
                    <div className='leftDiv'>
                        <h1 style={{ paddingBottom: "5px", marginBottom: "5px", borderBottom: "2px solid rgba(0,0,0,0.1)" }}>Messages</h1>
                        {messageUsers && messageUsers.map(obj => (
                            <a key={obj.id} href={userinfo.id === obj.sender ? "/Messages/" + obj.reciever : "/Messages/" + obj.sender}>
                                <div className="userRow" key={obj.id}>
                                    <img src={proxy + obj.profile_pic} alt='Profile' width="40px" style={{ background: "white" }} />
                                    <div style={{ marginLeft: "10px" }}>
                                        <h3>{obj.fullname}</h3>
                                        <p>{obj.lastMsg.message}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className='rightDiv'>
                        {param.id ?
                            <>
                                <div className='boxHeader'>
                                    <Link to={"/Profile/" + friendinfo.id}><img src={proxy + friendinfo.profile_pic} width="40px" style={{ background: "white" }} /></Link>
                                    <div style={{ marginLeft: "10px" }}>
                                        <Link to={"/Profile/" + friendinfo.id}><h3>{friendinfo.fullname}</h3></Link>
                                        <p>Online</p>
                                    </div>
                                </div>
                                <div className="boxBody" ref={messageRef}>
                                    {messages && messages.map((ele, key) => {
                                        return (
                                            <div key={key}>
                                                {ele.sender === userinfo.id ?
                                                    <><div className='msgSend'>
                                                        {ele.message}
                                                        <br /><span>now</span>
                                                    </div>
                                                        <div className="clr"></div>
                                                    </> : <>
                                                        <div className='msgRecieve'>
                                                            {ele.message}
                                                        </div>
                                                    </>}
                                            </div>
                                        )
                                    })}


                                </div>
                                <div className='boxFooter'>
                                    <form onSubmit={sendMsg} method="post">
                                        <input type="text" placeholder="Message" className='msgBox' />
                                        <input type="submit" value="SEND" className='msgButton' />
                                    </form>
                                </div>
                            </> :
                            <>
                                <h1 style={{ textAlign: "center", marginTop: "50px" }}>Click On Left Side User To Start Chat</h1>
                            </>
                        }
                    </div>
                    <div className="clr"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Messages