import { useEffect } from "react";
import { useNavigate } from "react-router";

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate("/Admin");
    });

    return(
        <>
        </>
    );
}

export default AdminLogout;