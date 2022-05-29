import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import "./styles/Profile.css";
import {proxy} from '../../package.json';
import formatDate from './innerComponents/myFun';
import { Backdrop, CircularProgress } from '@mui/material'

const Profile = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [userinfo, setUserinfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [userEducations, setUserEducations] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [postLimit] = useState(10);

    const [loader, setLoader] = useState(false);

    const [followBtnStatus, setFollowBtnStatus] = useState('');

    const getAllUserPosts = (mid) =>{
        Axios.get( proxy+"/getUserPosts", { params: { author: mid } }).then((response) => {
            setUserPosts(response.data);
            setLoader(false);
        });
    }

    useEffect(() => {
        let mid;
        setLoader(true);
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
                    
                    setLoader(false);
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
                    setLoader(false);
                });
            } else {
                navigate("/Login");
            }
        }
        Axios.get( proxy+"/getUserEducations", { params: { loginid: mid } }).then((response) => {
            setUserEducations(response.data);
            setLoader(false);
        });
        getAllUserPosts(mid);
        Axios.get( proxy+"/getFollowers", { params: { user1: mid } }).then((response) => {
            setUserFollowers(response.data);
            setLoader(false);
        });
        Axios.get( proxy+"/getFollowing", { params: { user1: mid } }).then((response) => {
            setUserFollowing(response.data);
            setLoader(false);
        });
    }, [navigate, param.loginid]);

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

    const getLikePostStatusCount = (status,count,type) => {

        if(status && status===true){
            if(count===1){
                return `You Like This ${type}!!!`;
            } else if(count===2){
                return `You and 1 Other Person Like This ${type}!!!`;
            } else if(count>2){
                return `You and ${count} Other Peoples Like This ${type}!!!`;
            }
        } else {
            if(count===1){
                return `1 Person Like This ${type}!!!`;
            } else if(count>1){
                return `${count} Peoples Like This ${type}!!!`;
            }
        }
        
    }

    const likeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy+ "/addLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                getAllUserPosts(userinfo.id)
            } else {
                alert("Some Error in Server, Please try Again!!!")
            }
        });
    }

    const dislikeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy+ "/deleteLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                getAllUserPosts(userinfo.id)
            } else {
                alert("SOme Error in Server, Please try Again!!!")
            }
        });
    }

    const submitComment = (e) => {
        e.preventDefault();
        setLoader(true);
        const commentText = e.target[0].value;
        const postId = e.target[1].value;

        Axios.post(proxy+ "/addComment", { loginid: localStorage.getItem("userId"), commentText: commentText, postId: postId }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                e.target[0].value = "";
                getAllUserPosts(userinfo.id)
                setLoader(false);
            }
        });
    }
    

    const allPostsWrapper = userPosts.length>0 && userPosts.slice(0, postLimit).map((obj,index) => {
        const mDate = new Date(obj.createdat);
        return (
            <div className="postMain" key={obj.id}>
                <div className="postHeader">gqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqw33333333333333333333333333333333333
                    <Link to={"/Profile/" + obj.loginid}>
                        <img src={ proxy + obj.profile_pic} height={40} alt="POST"/>
                    </Link>
                    <div style={{ "marginLeft": "8px", "flexGrow": "1" }}>
                        <p style={{ "fontSize": "16px" }}><Link to={"/Profile/" + obj.loginid}><b>{obj.fullname}</b></Link></p>
                        <p style={{ "fontSize": "12px", "marginTop": "1px","color": "#88898a" }}>{formatDate(mDate)}</p>
                    </div>
                    <div>
                        <ul type="none">
                            <li style={{ "fontSize": "18px", "padding": "10px 15px" }}><a href={"/Post/"+obj.id}><i className="fas fa-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="postBody">
                    <pre width="100%" style={{"margin":"10px 10px"}}>
                        {obj.posttext !== "[object Object]" ? <>{obj.posttext}</> : <></>}
                    </pre>
                    {obj.postimg ? <><img src={proxy  + obj.postimg} width="100%" alt="POST"/> </> : <></>}
                </div>
                <div className="postFooter">
                    <p style={{ "margin": "5px 0px 0px 10px","fontSize":"13px"  }}>
                        {getLikePostStatusCount(obj.likePostStatus,obj.likePostCount,"Post")}
                    </p>
                    <div className="postFooterSec1">
                        {obj.likePostStatus && obj.likePostStatus===true ?
                            <button value="Post" name={index} className="dislikeBtn" onClick={dislikeFun} id={obj.id}><i className="far fa-thumbs-down"></i> Liked</button>
                            : <button value="Post" name={index} className="likeBtn" onClick={likeFun} id={obj.id}><i className="far fa-thumbs-up"></i> Like</button>
                        }
                        <button className="commentBtn"><b>{obj.comments && obj.comments.length>0 ?obj.comments.length:""}</b> &nbsp;<i className="far fa-comment"></i> Comment</button>
                        <button className="shareBtn"><i className="far fa-share"></i> Share</button>
                    </div>
                    <div className="commentDiv">
                        {
                            obj.comments && obj.comments.map((ele, i) => {
                                return (
                                    <div className="commentRow" key={i}>
                                        <div style={{ "display": "flex", "padding": "0 5px 5px 5px" }}>
                                            <img src={proxy + ele.profile_pic} height={32} alt="POST"/>
                                            <div>
                                            <p style={{ "marginLeft": "5px" }}><b>{ele.fullname}</b></p>
                                            <p style={{ "fontSize":"11px", "color":"#88898a", "marginLeft": "5px", "lineHeight": "18px"}}>{formatDate(new Date(ele.createdAt))} </p>
                                            </div>
                                            <p style={{ "padding": "0 5px 0 5px", "flexGrow":"1" }}>{ele.commentText}</p>
                                            {ele.likeCommentStatus
                                            ? <button onClick={dislikeFun} className="dislikeBtnComment" value="Comment" id={ele.id}><i className="far fa-thumbs-down"></i> Liked</button>
                                            :
                                            <button onClick={likeFun} className="likeBtnComment" value="Comment" id={ele.id}><i className="far fa-thumbs-up"></i> Like</button>}
                                        </div>
                                        <p style={{ "margin": "2px 0 2px 5px","fontSize":"12px" }}>
                                            {getLikePostStatusCount(ele.likeCommentStatus,ele.likeCommentCount,"Comment")}
                                        </p>
                                    </div>
                                )
                            })
                        }
                        <form method="post" onSubmit={submitComment}>
                            <img src={proxy+userinfo.profile_pic} alt="..." height="40px" style={{"border":"1px solid rgba(0,0,0,0.2)","borderRight":"0"}}/>
                            <input type="text" className="commentInputText" placeholder="Add Your Comment" />
                            <input type="hidden" value={obj.id} />
                            <input type="submit" className="commentSubmitBtn" value="POST" />
                        </form>
                    </div>
                </div>
            </div>
        );
    });


    return (
        <>
            <Header />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                <div style={index+1===row.length ? {"padding": "8px 0px"} : {"padding": "8px 0px","borderBottom": "1px solid rgba(0,0,0,0.4)"}} key={index}>
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
                    { allPostsWrapper }
                    {/* {
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
                    } */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;