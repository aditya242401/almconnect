import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import "./styles/Profile.css";
import {proxy} from '../../package.json';

const Profile = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [userinfo, setUserinfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [userEducations, setUserEducations] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);

    const [followBtnStatus, setFollowBtnStatus] = useState('');

    useEffect(() => {
        let mid;
        if (localStorage.getItem("userId")) {
            let loginid = param.loginid ? param.loginid : localStorage.getItem("userId");
            mid = param.loginid ? param.loginid : localStorage.getItem("userId");
            // Set Login Data
            Axios.get( proxy+"/getDataById", { params: { loginid: loginid } }).then((response) => {
                setUserinfo(response.data[0]);
            });

            // Set Follow Btn Status
            if (localStorage.getItem("userId") !== mid) {
                Axios.get( proxy+"/getUserFollowStatus", { params: { user1: localStorage.getItem("userId"), user2: mid } }).then((response) => {
                    if (response.data.length > 0)
                        setFollowBtnStatus(response.data[0].status);
                })
            }
        } else {
            setFollowBtnStatus("Not Login")
            if (param.loginid) {
                console.log('ad')
                mid = param.loginid;
                const loginid = param.loginid;
                Axios.get( proxy+"/getDataById", { params: { loginid: loginid } }).then((response) => {
                    setUserinfo(response.data[0]);
                });
            } else {
                navigate("/Login");
            }
        }
        Axios.get( proxy+"/getUserEducations", { params: { loginid: mid } }).then((response) => {
            setUserEducations(response.data);
        });
        Axios.get( proxy+"/getUserPosts", { params: { author: mid } }).then((response) => {
            setUserPosts(response.data);
        });
        Axios.get( proxy+"/getFollowers", { params: { user1: mid } }).then((response) => {
            setUserFollowers(response.data);
        });
        Axios.get( proxy+"/getFollowing", { params: { user1: mid } }).then((response) => {
            setUserFollowing(response.data);
        });
    }, []);

    const followFun = () => {
        const user1 = localStorage.getItem("userId");
        const user2 = param.loginid;

        Axios.post( proxy+"/sendFollowRequest", { user1: user1, user2: user2 }).then((response) => {
            console.log(response)
            if (response.data.myStatus === "Yes")
                setFollowBtnStatus("Accepted");
            else if (response.data.myStatus === "No")
                setFollowBtnStatus("Pending");
        });
    }

    return (
        <>
            <Header />
            <div className="profile">
                <div className="section1">
                    <div className="section11">
                        <img src= {proxy+"/images/Banner.jpg"} width="100%" alt="Banner" />
                        {userinfo.profile_pic === "" ? <>
                            <img src={userinfo.gender === "Male" ?  proxy+"/posts/Male.jpg" :  proxy+"/posts/Female.jpg"} width="160px" className="profilepic" alt="Profile" />
                        </> : <>
                            <img src={ proxy+"" + userinfo.profile_pic} width="160px" className="profilepic" alt="Profile" />
                        </>}
                        <div className="photoleft">
                            <h1 style={{ "fontSize": "40px" }}>{userinfo.fullname}</h1>
                            <h4>{userinfo.aboutu}</h4>
                            <p><b>Hobbies :</b> {userinfo.hobbies}</p>
                        </div>
                        <div className="photoright">
                            {userinfo.id === Number(localStorage.getItem("userId")) ?
                                <><Link to='/UploadProfilePicture'>Change Profile Picture</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to='/EditProfile'>Edit Profile</Link></>
                                :
                                <>
                                    {followBtnStatus === "Pending" ?
                                        <button className="followBtn">Requested</button>
                                        : followBtnStatus === "Accepted" ? <button className="followBtn">Following</button>
                                            : followBtnStatus === "Not Login" ? <button className="followBtn" onClick={() => { navigate('/Login') }}>Follow</button> : <button className="followBtn" onClick={followFun}>Follow</button>
                                    }
                                    &nbsp;&nbsp;
                                    <Link to={"/messages/"+userinfo.id} className="messageBtn">Message</Link>
                                </>
                            }
                        </div>
                        <div style={{ "clear": "both" }}></div>
                    </div>
                </div>

                <div className="section2">
                    <h2>Education</h2>
                    {
                        userEducations.map((ele,index,row)=>{
                            const date1 = new Date(ele.startdate);
                            const date2 = new Date(ele.enddate);
                            return (
                                <div style={index+1==row.length ? {"padding": "8px 0px"} : {"padding": "8px 0px","borderBottom": "1px solid rgba(0,0,0,0.4)"}} key={index}>
                                    <p><b>{ele.school}</b></p>
                                    <p>{ele.degree+', '+ele.fieldofstudy}</p>
                                    <p>{date1.getFullYear() +' - ' + date2.getFullYear()}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="section3">
                    <div className="leftSection3">
                        <h2>Followers</h2>
                        {
                            userFollowers.slice(0,6).map((ele,i)=>{
                                return (
                                    <p key={i}><a href={'/Profile/'+ele.user1}>{ele.fullname}</a></p>
                                )
                            })
                        }
                    </div>
                    <div className="rightSection3">
                        <h2>Following</h2>
                        {
                            userFollowing.slice(0,6).map((ele,i)=>{
                                return (
                                    <p key={i}><a href={'/Profile/'+ele.user2}>{ele.fullname}</a></p>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="sectionLast">
                    {
                        userPosts.map((obj, i) => {
                            const mDate = new Date(obj.createdat);
                            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                            return (
                                <div className="postMain" key={i}>
                                    <div className="postHeader">
                                        <p><Link to={"/Profile/" + obj.author}><b>{obj.fullname}</b></Link></p>
                                        <p>{days[mDate.getDay()]} {mDate.getHours()}:{mDate.getMinutes()}</p>
                                    </div>
                                    <div className="postBody">
                                        {obj.postimg ? <img src={ proxy+obj.postimg} width="100%" /> : <></>}
                                        <pre width="100%">
                                            {obj.posttext}
                                        </pre>
                                    </div>
                                    <div className="postFooter">
                                        <button className="likeBtn"><i className="far fa-thumbs-up"></i> Like</button>
                                        <button className="commentBtn"><i className="far fa-comment"></i> Comment</button>
                                        <button className="shareBtn"><i className="far fa-share"></i> Share</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;