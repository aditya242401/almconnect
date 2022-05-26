import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import { proxy } from "../../package.json";
import "./styles/DefaultPage.css";
import formatDate from "./innerComponents/myFun";

const DefaultPage = () => {
    const param = useParams();
    const [pageData, setPageData] = useState(null)
    const [viewType, setViewType] = useState(null);
    const [posts, setPosts] = useState(null);

    // For Posting 
    const [postText, setPostText] = useState({});
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (param.pageid) {
            getAllPosts(param.pageid)
            let pageid = param.pageid;
            Axios.get(proxy + "/getPageById", { params: { pageid: pageid } }).then((response) => {
                if (response.data && response.data.length > 0) {
                    setPageData(response.data[0]);
                    if (response.data[0].createdby == localStorage.getItem("userId")) {
                        setViewType("Admin")
                    } else {
                        setViewType("User")
                    }
                } else {
                    setViewType("NotFound");
                }
            })
        }
    }, []);

    const adminData = () => {
        return (
            <>
                <h1>Admin</h1>
            </>
        )
    }

    const userData = () => {
        return (
            <>
                <h1>User</h1>
            </>
        )
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
        formData.append("authorType", "Page");
        formData.append("author", param.pageid);

        Axios.post( proxy + "/newPost", formData, { headers: { loginid: localStorage.getItem("userId") } }).then((response) => {
            if (response.status === 200) {
                document.getElementById("postMsg1").innerHTML = response.data.message;
                document.getElementById("postTextarea").value = "";
                getAllPosts(param.pageid)
            } else
                document.getElementById("postMsg2").innerHTML = response.data.message;
        });
    }

    const getAllPosts = (author) => {
        Axios.get(proxy + "/getPagePosts", { params: { author: author } }).then((response) => {
            setPosts(response.data);
        })
    }

    const submitComment = (e) => {
        e.preventDefault();
        const commentText = e.target[0].value;
        const postId = e.target[1].value;

        Axios.post(proxy+ "/addComment", { loginid: localStorage.getItem("userId"), commentText: commentText, postId: postId }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows == 1) {
                e.target[0].value = "";
                getAllPosts(param.pageid)
            }
        });
    }

    const likeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy+ "/addLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows == 1) {
                getAllPosts(param.pageid)
            } else {
                alert("Some Error in Server, Please try Again!!!")
            }
        });
    }

    const dislikeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy+ "/deleteLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows == 1) {
                getAllPosts(param.pageid)
            } else {
                alert("SOme Error in Server, Please try Again!!!")
            }
        });
    }

    const getLikePostStatusCount = (status,count,type) => {

        if(status && status==true){
            if(count==1){
                return `You Like This ${type}!!!`;
            } else if(count==2){
                return `You and 1 Other Person Like This ${type}!!!`;
            } else if(count>2){
                return `You and ${count} Other Peoples Like This ${type}!!!`;
            }
        } else {
            if(count==1){
                return `1 Person Like This ${type}!!!`;
            } else if(count>1){
                return `${count} Peoples Like This ${type}!!!`;
            }
        }
        
    }

    const allPostsWrapper = posts && posts.slice(0, 4).map((obj,index) => {
        const mDate = new Date(obj.createdat);

        return (
            <div className="postMain" key={index}>
                <div className="postHeader">
                    <Link to={"/Page/" + obj.author}>
                        <img src={ proxy + obj.logo} height={40} />
                    </Link>
                    <div style={{ "marginLeft": "8px", "flexGrow": "1" }}>
                        <p style={{ "fontSize": "16px" }}><Link to={"/Page/" + obj.author}><b>{obj.name}</b></Link></p>
                        <p style={{ "fontSize": "12px", "marginTop": "1px","color": "#88898a" }}>{formatDate(mDate)}</p>
                    </div>
                    <div>
                        <ul type="none">
                            <li style={{ "fontSize": "18px", "padding": "10px 15px" }}><a href={"/Post/Page-"+obj.id}><i className="fas fa-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="postBody">
                    <pre width="100%" style={{"margin":"10px 10px"}}>
                        {obj.posttext != "[object Object]" ? <>{obj.posttext}</> : <></>}
                    </pre>
                    {obj.postimg ? <><img src={proxy  + obj.postimg} width="100%" /> </> : <></>}
                </div>
                <div className="postFooter">
                    <p style={{ "margin": "5px 0px 0px 10px","fontSize":"13px"  }}>
                        {getLikePostStatusCount(obj.likePostStatus,obj.likePostCount,"Post")}
                    </p>
                    <div className="postFooterSec1">
                        {obj.likePostStatus && obj.likePostStatus==true ?
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
                                            <img src={proxy + ele.profile_pic} height={32} />
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
            {pageData ?
                <div className="page">
                    <div className="section1">
                        <img src={proxy+"/images/Banner.jpg"} width="100%" alt="Banner" />
                        <div className="section11">
                            <img src={proxy + pageData.logo} width="160px" className="pageLogo" />
                            <div style={{ "marginLeft": "190px" }}><h1>{pageData.name}</h1>
                                <button>Follow</button>
                            </div>
                            <div className="clr"></div>
                        </div>
                    </div>
                    <div className="section2">
                        <h1>About</h1>
                        <p><b>Type </b> : {pageData.type}</p>
                        <p><b>Address</b> : {pageData.address}</p>
                        <p><b>Phone Number</b> :{pageData.phonenumbers}</p>
                        <p><b>Email Address</b> :{pageData.emails}</p>
                        <p><b>Founded Year</b> :{pageData.foundedyear}</p>
                    </div>
                    <div className="postSection">
                        <textarea placeholder="Share what's on your mind" rows="5" id="postTextarea" onChange={(e) => { setPostText(e.target.value); }} className="postTextarea"></textarea><br />
                        <input type="file" name="file" id="postUploadImageButton" className="postUploadImageButton" onChange={saveFile} />
                        <br />
                        <button className="postButton" onClick={submitPost}><i className="fas fa-cloud-upload"></i> POST</button>
                        <p id="postMsg1" className="mt-1 successMsg"></p>
                        <p id="postMsg2" className="mt-1 dangerMsg"></p>
                    </div>

                    {allPostsWrapper}
                </div>
                : ""}
            {viewType == "Admin"
                ? adminData() :
                viewType == "User" ? userData() :
                    viewType != null ? <h1>Page Not Found</h1> : ""}
            <Footer />
        </>
    )
}

export default DefaultPage;