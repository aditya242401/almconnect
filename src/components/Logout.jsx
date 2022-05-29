import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate("/Login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
        </>
    );
}

export default Logout;