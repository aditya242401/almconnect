import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import "./styles/Home.css";
import { proxy } from "../../package.json";

const Home = () => {

    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState({});
    // For Posting 
    const [postText, setPostText] = useState({});
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    
    // For Showing the post By Limit
    const [postLimit, setPostLimit] = useState(10);
    const [posts, setPosts] = useState([]);

    // Use Effect
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            const loginid = localStorage.getItem("userId");
            Axios.get(proxy+"/getDataById", { params: { loginid: loginid } }).then((response) => {
                setUserinfo(response.data[0]);
            });
            getAllPosts(loginid)
        } else {
            navigate("/Login");
        }
    }, [navigate]);

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

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const submitPost = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", fileName);
        formData.append("postText", postText);
        formData.append("authorType", "User");
        formData.append("author", userinfo.id);

        Axios.post( proxy + "/newPost", formData, { headers: { loginid: localStorage.getItem("userId") } }).then((response) => {
            if (response.status === 200) {
                document.getElementById("postMsg1").innerHTML = response.data.message;
                document.getElementById("postTextarea").value = "";
                getAllPosts(userinfo.id)
            } else
                document.getElementById("postMsg2").innerHTML = response.data.message;
        });
    }

    const getAllPosts = (loginid) => {
        Axios.get(proxy + "/getAllPosts", { params: { loginid: loginid } }).then((response) => {
            setPosts(response.data);
        })
    }

    const submitComment = (e) => {
        e.preventDefault();
        const commentText = e.target[0].value;
        const postId = e.target[1].value;

        Axios.post(proxy+ "/addComment", { loginid: localStorage.getItem("userId"), commentText: commentText, postId: postId }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                e.target[0].value = "";
                getAllPosts(userinfo.id)
            }
        });
    }

    const likeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy+ "/addLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                getAllPosts(userinfo.id)
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
                getAllPosts(userinfo.id)
            } else {
                alert("SOme Error in Server, Please try Again!!!")
            }
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

    const allPostsWrapper = posts.slice(0, postLimit).map((obj,index) => {
        const mDate = new Date(obj.createdat);

        return (
            <div className="postMain" key={obj.id}>
                <div className="postHeader">
                    <Link to={"/Profile/" + obj.loginid}>
                        <img src={ proxy + obj.profile_pic} height={40}  alt="..."/>
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
                    {obj.postimg ? <><img src={proxy  + obj.postimg} width="100%" alt="..."/> </> : <></>}
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
                        <button className="commentBtn"><b>{obj.comments.length>0 ?obj.comments.length:""}</b> &nbsp;<i className="far fa-comment"></i> Comment</button>
                        <button className="shareBtn"><i className="far fa-share"></i> Share</button>
                    </div>
                    <div className="commentDiv">
                        {
                            obj.comments.map((ele, i) => {
                                return (
                                    <div className="commentRow" key={i}>
                                        <div style={{ "display": "flex", "padding": "0 5px 5px 5px" }}>
                                            <img src={proxy + ele.profile_pic} height={32} alt="..."/>
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
                            <img src={proxy+userinfo.profile_pic} height="40px"  alt="..." style={{"border":"1px solid rgba(0,0,0,0.2)","borderRight":"0"}}/>
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
            <div className="homepage">
                <div className="sectionLeft">
                    <center><h3 className="m-1">🙏 Welcome {userinfo.fullname}</h3>
                        <h5>{userinfo.college}</h5></center>
                    <hr className="mb-1" />
                    <div className="leftMenu">
                        <ul type="none">
                            <li><Link to="/Profile"><i className="fas fa-user"></i> Profile</Link></li>
                            <li><Link to="/Notifications"><i className="fas fa-bell"></i> Notifications</Link></li>
                            <li><Link to="/FindConnections"><i className="fas fa-list"></i> Find Connections</Link></li>
                            <li><Link to="/Pages"><i className="fas fa-briefcase"></i> Pages</Link></li>
                            <li><Link to="/Messages"><i className="fas fa-hand-point-right"></i> Messages </Link></li>
                        </ul>
                    </div>
                </div>
                <div className="sectionRight">
                    <div className="postSection">
                        <textarea placeholder="Share what's on your mind" rows="5" id="postTextarea" onChange={(e) => { setPostText(e.target.value); }} className="postTextarea"></textarea><br />
                        <input type="file" name="file" id="postUploadImageButton" className="postUploadImageButton" onChange={saveFile} />
                        <br />
                        <button className="postButton" onClick={submitPost}><i className="fas fa-cloud-upload"></i> POST</button>
                        <p id="postMsg1" className="mt-1 successMsg"></p>
                        <p id="postMsg2" className="mt-1 dangerMsg"></p>
                    </div>
                    <div className="allPosts">
                        {allPostsWrapper}
                        {posts.length > postLimit ? <button className="readMorePosts" onClick={() => { setPostLimit(postLimit + 1) }}>Read More</button> : <></>}
                    </div>
                </div>
                <div className="sectionRightPannel">
                    <center><h1><i className="far fa-newspaper"></i> News & Event</h1></center><hr />
                    <br/>
                    <h4 className="ml-2">No News Available Now...</h4>
                </div>
                <div style={{ "clear": "both" }}></div>
            </div>
            <Footer />
        </>
    );
}

export default Home;