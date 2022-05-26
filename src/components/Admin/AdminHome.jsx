import { Link } from "react-router-dom";

const AdminHome = ()=>{
    return (
        <div>
            <h1>AdminHome</h1>
            <Link to="/Admin/AddCollege">Add College</Link><br/>
            <Link to="/Admin/Logout">Logout</Link>
        </div>
    )
}

export default AdminHome;
