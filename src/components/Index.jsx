import Axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./includes/Footer";
import Header from "./includes/Header";
import {proxy} from '../../package.json';

const Index = () => {

    const [colleges,setColleges] = useState([{}]);

    useEffect(()=>{
      Axios.get( proxy+"/getcolleges").then((response)=>{
          setColleges(response.data);
      });
    },[]);

    const collegesArray = colleges && colleges.map((college,i) => {
      return (
          <div className="collegesrow" key={i}>
                <div className="colegesrowimg">
                  <img src={ proxy+""+college.logo} alt="..."/>
                </div>
                <h3>{college.name}</h3>
                <p>{college.address}</p>
                <div className="clr"></div>
          </div>
      );
    });

    return(
        <>
        <Header />
        <div className="indexpage">
          <div className='section1'>
            <div style={{"marginTop":"-100px"}}>
              <h1 style={{ "fontSize":"50px","color":"white","marginLeft":"40px" }}>All College Student, Alumni<br/>in One Place ❤</h1>
                {/* <input type='text' placeholder='Search Your College, Student, Aluminai' className="search-index"/> */}
                {/* <button className="button-index"><i className="far fa-search"></i> Search</button> */}
            </div>
          </div>
          <div className="section2">
            <center><h1 className="section2heading">Our Top College's</h1></center>
            <div className='collegesbox'>
                { collegesArray }
            </div>
          </div>
        </div>
        <Footer />
        </>
    );
}

export default Index;