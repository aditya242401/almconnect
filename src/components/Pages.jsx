import Header from "./includes/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios  from "axios";
import './styles/Pages.css';
import Footer from "./includes/Footer";
import {proxy} from '../../package.json';

const Pages = () => {
    const navigate = useNavigate();
    // const [userInfo,setUserinfo] = useState({});
    const [userPages, setUserPages] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem("userId")){
            let loginid = localStorage.getItem("userId");
            // Set Login Data
            // Axios.get( proxy+"/getDataById",{ params: {loginid:loginid} }).then((response)=>{
            //     setUserinfo(response.data[0]);
            // });
            // // 
            Axios.get( proxy+"/getPages",{ params: {loginid:loginid} }).then((response)=>{
                if(response.data[0]){
                    setUserPages(response.data);
                } else {
                    setUserPages(null);
                }
            });
        } else {
            navigate("/Login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <>
            <Header/>
            <div className="pages">
                <div className="mainBody">
                    <h1>Pages</h1>
                    {
                        userPages==null ?
                        <h4>No Page Found.</h4>
                        :
                        (userPages.map((ele)=>{
                            return (
                                <div className="pagesRow">
                                    <img src={ proxy+ele.logo} height="90px" alt="..."/>
                                    <div style={{"marginLeft":"10px"}}>
                                        <h4><Link to={'/Page/'+ele.id}>{ele.name}</Link></h4>
                                        <p>{ele.type}</p>
                                        <p>{ele.phonenumbers}</p>
                                        <p>{ele.emails}</p>
                                        <p>{ele.address}</p>
                                    </div>
                                </div>
                            )
                        }))
                    }
                    <button className="addPage"><Link to="/AddPage">Add Page</Link></button>
                </div>
            </div>
            <Footer/>
        </>
    )   
}

export default Pages;