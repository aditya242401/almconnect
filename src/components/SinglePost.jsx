import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import formatDate from "./innerComponents/myFun";
import "./styles/SinglePost.css";
import { proxy } from "../../package.json";

const SinglePost = () => {
    const params = useParams();
    const [postData, setPostData] = useState(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getPost = useCallback(() => {
        let postid = params.postid;
        let paramsObj = { params: { postid: postid, loginid: localStorage.getItem("userId") } }
        if(params.postid.split('-').length > 1){
            paramsObj = { params: { authorType:"Page", postid: params.postid.split('-')[1], loginid: localStorage.getItem("userId") } }
        }
        Axios.get(proxy + "/getPostById", paramsObj).then((response) => {
            if (response.data && response.data.length > 0) {
                setPostData(response.data[0]);
            }
        })
    })

    useEffect(() => {
        if (params.postid) {
            getPost();
        }
    
    }, [getPost, params.postid]);

    const submitComment = (e) => {
        e.preventDefault();
        const commentText = e.target[0].value;
        const postId = e.target[1].value;

        Axios.post(proxy + "/addComment", { loginid: localStorage.getItem("userId"), commentText: commentText, postId: postId }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                e.target[0].value = "";
                getPost()
            }
        });
    }

    const likeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy + "/addLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                getPost();
            } else {
                alert("Some Error in Server, Please try Again!!!")
            }
        });
    }

    const dislikeFun = (e) => {
        const liketype = e.target.value;
        const typeid = e.target.id;

        Axios.post(proxy + "/deleteLike", { loginid: localStorage.getItem("userId"), liketype: liketype, typeid: typeid }).then((response) => {
            if (response.data.affectedRows && response.data.affectedRows === 1) {
                getPost();
            } else {
                alert("SOme Error in Server, Please try Again!!!")
            }
        });
    }

    const getLikePostStatusCount = (status, count, type) => {

        if (status && status === true) {
            if (count === 1) {
                return `You Like This ${type}!!!`;
            } else if (count === 2) {
                return `You and 1 Other Person Like This ${type}!!!`;
            } else if (count > 2) {
                return `You and ${count} Other Peoples Like This ${type}!!!`;
            }
        } else {
            if (count === 1) {
                return `1 Person Like This ${type}!!!`;
            } else if (count > 1) {
                return `${count} Peoples Like This ${type}!!!`;
            }
        }

    }

    return (
        <>
            <Header />
            {postData &&
                <div className="singlePost">
                    <div className="postMain" key={postData.id}>
                        <div className="postHeader">
                            {postData.authorType === "Page" ? <>
                                <Link to={"/Page/" + postData.pageId}>
                                    <img src={proxy + postData.logo} height={40} alt=".."/>
                                </Link>
                                <div style={{ "marginLeft": "8px", "flexGrow": "1" }}>
                                    <p style={{ "fontSize": "16px" }}><Link to={"/Page/" + postData.pageId}><b>{postData.name}</b></Link></p>
                                    <p style={{ "fontSize": "12px", "marginTop": "1px", "color": "#88898a" }}>{formatDate(new Date(postData.createdat))}</p>
                                </div>
                            </> : <>
                                <Link to={"/Profile/" + postData.loginid}>
                                    <img src={proxy + postData.profile_pic} height={40} alt=".."/>
                                </Link>
                                <div style={{ "marginLeft": "8px", "flexGrow": "1" }}>
                                    <p style={{ "fontSize": "16px" }}><Link to={"/Profile/" + postData.loginid}><b>{postData.fullname}</b></Link></p>
                                    <p style={{ "fontSize": "12px", "marginTop": "1px", "color": "#88898a" }}>{formatDate(new Date(postData.createdat))}</p>
                                </div>
                            </>}

                        </div>
                        <div className="postBody">
                            <pre width="100%" style={{ "margin": "10px 10px" }}>
                                {postData.posttext !== "[Object Object]" ? <>{postData.posttext}</> : <></>}
                            </pre>
                            {postData.postimg ? <><img src={proxy + postData.postimg} width="100%" alt=".."/> </> : <></>}
                        </div>
                        <div className="postFooter">
                            <p style={{ "margin": "5px 0px 0px 10px", "fontSize": "13px" }}>
                                {getLikePostStatusCount(postData.likePostStatus, postData.likePostCount, "Post")}
                            </p>
                            <div className="postFooterSec1">
                                {postData.likePostStatus && postData.likePostStatus === true ?
                                    <button value="Post" className="dislikeBtn" onClick={dislikeFun} id={postData.id}><i className="far fa-thumbs-down"></i> Liked</button>
                                    : <button value="Post" className="likeBtn" onClick={likeFun} id={postData.id}><i className="far fa-thumbs-up"></i> Like</button>
                                }
                                <button className="commentBtn"><b>{postData.comments.length > 0 ? postData.comments.length : ""}</b> &nbsp;<i className="far fa-comment"></i> Comment</button>
                                <button className="shareBtn"><i className="far fa-share"></i> Share</button>
                            </div>
                            <div className="commentDiv">
                                {
                                    postData.comments.map((ele, i) => {
                                        return (
                                            <div className="commentRow" key={i}>
                                                <div style={{ "display": "flex", "padding": "0 5px 5px 5px" }}>
                                                    <img src={proxy + ele.profile_pic} height={32} alt=".."/>
                                                    <div>
                                                        <p style={{ "marginLeft": "5px" }}><b>{ele.fullname}</b></p>
                                                        <p style={{ "fontSize": "11px", "color": "#88898a", "marginLeft": "5px", "lineHeight": "18px" }}>{formatDate(new Date(ele.createdAt))} </p>
                                                    </div>
                                                    <p style={{ "padding": "0 5px 0 5px", "flexGrow": "1" }}>{ele.commentText}</p>
                                                    {ele.likeCommentStatus
                                                        ? <button onClick={dislikeFun} className="dislikeBtnComment" value="Comment" id={ele.id}><i className="far fa-thumbs-down"></i> Liked</button>
                                                        :
                                                        <button onClick={likeFun} className="likeBtnComment" value="Comment" id={ele.id}><i className="far fa-thumbs-up"></i> Like</button>}
                                                </div>
                                                <p style={{ "margin": "2px 0 2px 5px", "fontSize": "12px" }}>
                                                    {getLikePostStatusCount(ele.likeCommentStatus, ele.likeCommentCount, "Comment")}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                <form method="post" onSubmit={submitComment}>
                                    <input type="text" className="commentInputText" placeholder="Add Your Comment" />
                                    <input type="hidden" value={postData.id} />
                                    <input type="submit" className="commentSubmitBtn" value="POST" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}

            <Footer />
        </>
    )
}

export default SinglePost;