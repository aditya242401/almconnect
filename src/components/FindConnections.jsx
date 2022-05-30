import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './includes/Header';
import "./styles/FindConnections.css";
import {proxy} from '../../package.json';
import { CircularProgress, Backdrop } from '@mui/material';

const FindConnections = () => {
    const navigate = useNavigate();
    const [mainData, setMainData]=useState(null);
    const [searchDataUser, setSearchDataUser] = useState(null);
    const [searchDataPage, setSearchDataPage] = useState(null);
    const [loginid, setLoginId] = useState('');
    const [graduationYears, setGraduationYears] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [selectedGY, setSelectedGY] = useState('');
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setLoginId(localStorage.getItem("userId"));
            graduationWrapper();
        } else {
            navigate("/Login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeSearch = (e)=>{
        setInputSearch(e.target.value);
    }

    const submitSearch = async () => {
        if (!inputSearch) {
            setMainData(null);
            setSearchDataUser(null);
            setSearchDataPage(null);
            return;
        }
        setLoading(true);
        let response = await Axios.get( proxy+"/searchUser", { params: { searchVal: inputSearch, loginid: loginid } });

        if (response.data.result.length > 0){
            let data = response.data.result;
            response.data.result.map(async (ele, i, row)=>{
                let userCollegeData = await Axios.get(proxy+"/getUserEducations",{ params: {loginid:ele.id} });
                data[i]['colleges'] = userCollegeData.data;
                if(row.length-1===i) {
                    setSearchDataUser(data);
                    setMainData(data);
                    setLoading(false);
                }
            })
        } else {
            setSearchDataUser(null)
            setMainData(null);
            setLoading(false);
        } 
        if (response.data.result1.length > 0)
            setSearchDataPage(response.data.result1);
        else 
            setSearchDataPage(null)   
    }

    const graduationWrapper = ()=>{
        let graduationStartYear = 2000;
        let graduationEndYear = new Date().getFullYear();
        let temp = [];
        for(let i=graduationStartYear;i<=graduationEndYear;i++){
            temp.push(i);
        }
        setGraduationYears(temp);
    }

    const updateResultOnChange = (year)=>{
        if(year){
            if(searchDataUser){
                setLoading(true);
                let data = mainData.filter((ele)=> {
                    let flag = 0;
                    for(let i=0;i<ele.colleges.length;i++){
                        if(new Date(ele.colleges[i].enddate).getFullYear().toString()===year){
                            flag = 1;
                            break;
                        }
                    }
                    return flag===1;
                } );
                setSearchDataUser(data);
                setLoading(false);
            }
        }
    }

    const onSelectGY = (e)=>{
        setSelectedGY(e.target.value);
        updateResultOnChange(e.target.value);
    }   

    const getLatestCollege = (colleges)=>{
        let college = colleges[0];
        for(let i=1;i<colleges.length;i++){
            if(college.enddate<=colleges[i].enddate){
                college = colleges[i];
            }
        }
        return college;
    }

    return (
        <>
            <Header />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='findconnections'>
                <div className='searchBox'>
                    <div className='inlineSearchBtn'>
                        <input type="text" className="inputSearch" placeholder="Search..." value={inputSearch} onChange={onChangeSearch} />
                    </div>
                    <div style={{"marginTop": "10px"}}>
                        <button className='btn searchBtn' onClick={submitSearch}>Submit Search</button>
                    </div>
                    <div style={{"marginTop": "10px"}}>
                        <span className='filter'>Filter</span>
                        <label>Graduation Year : </label>
                        <select style={{"width": "200px"}} value={selectedGY} onChange={onSelectGY}>
                            <option>Select Graduation Year</option>
                            { graduationYears.map((ele,i)=> (
                                <option key={i} value={ele}> {ele} </option>
                            )) }
                        </select>
                        {/* <label style={{"marginLeft": "10px"}}>College : </label>
                        <select style={{"width": "200px"}} value={selectedGY} onChange={onSelectGY}>
                            <option>Select College</option>
                            { graduationYears.map((ele,i)=> (
                                <option key={i} value={ele}> {ele} </option>
                            )) }
                        </select> */}
                    </div>
                </div>
                <div className='searchResult'>
                    <h1 style={{ "textAlign": "center", "padding": "8px 0px", "borderBottom": "1px solid rgba(0,0,0,0.5)" }}>Search Result</h1>
                    {searchDataUser && searchDataUser.map((obj) => (
                        <div className="userRow" key={obj.id}>
                            <Link to={"/Profile/" + obj.id}>
                                <img src={'http://localhost:3001' + obj.profile_pic} alt='Profile' width="80px" className='searchDataProfile' />
                                <h3>{obj.fullname}</h3>
                            </Link>
                            <p>{obj.aboutu}</p>
                            <p>{obj.hobbies}</p>
                            <p>
                                {obj.colleges && obj.colleges.length>0 && 
                                `${getLatestCollege(obj.colleges).degree} - ${getLatestCollege(obj.colleges).school}`}
                            </p>
                            <div className='clr'></div>
                        </div>
                    ))}
                    {searchDataPage && searchDataPage.map((obj) => (
                        <div className="userRow" key={obj.id}>
                            <Link to={"/Page/" + obj.id}><img src={'http://localhost:3001' + obj.logo} alt='Profile' width="80px" className='searchDataProfile' />
                                <h3>{obj.name}</h3></Link>
                            <p>{obj.type}</p>
                            <p>{obj.address}</p>
                            <p>{obj.phonenumbers}, {obj.emails}</p>
                            <div className='clr'></div>
                        </div>
                    ))}
                    {!searchDataUser && !searchDataPage ? <h1>No Data Found</h1> : (searchDataUser.length<=0? <h1>No Data Found</h1> : "")}
                </div>
            </div>
        </>
    )
}

export default FindConnections;
