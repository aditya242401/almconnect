import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate("/Login");
    });

    return(
        <>
        </>
    );
}

export default Logout;