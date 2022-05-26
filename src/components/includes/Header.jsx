import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {proxy} from '../../../package.json';

const Header = () => {
    const [isLoggedIn,setIsLoggedIn] = useState('');
    const [fullname, setFullname] = useState('');

    useEffect(()=>{
        if(localStorage.getItem("userId")){
            const loginid = localStorage.getItem("userId");
            Axios.get( proxy+"/getDataById",{ params: {loginid:loginid} }).then((response)=>{
                setFullname(response.data[0].fullname);
            });
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    },[]);
    return(
        <div className="header">
          <h1 style={ {'float':"left","marginLeft":"5%", "lineHeight":"43px"} }><Link to='/'>ALMConnect</Link></h1>
          <ul type='none'>
              {isLoggedIn?(<>
              <li><Link to='/Home'><i className="far fa-home"></i> Home</Link></li> 
              <li><a href='/Profile'><i className="far fa-user-circle"></i> {fullname}</a></li> 
              <li><Link to='/Logout'><i className="far fa-sign-out"></i> Logout</Link></li></>):(<>
              <li><Link to='/Login'><i className="far fa-sign-in"></i> Sign In</Link></li> 
              <li><Link to='/Signup'><i className="far fa-user-plus"></i> Sign Up</Link></li></>)}
              
          </ul>
          <div style={{'clear':'boath'}}></div>
      </div>
    );
}

export default Header;