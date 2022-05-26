import { Link } from "react-router-dom";

const Footer = () =>{
    return(
        <>
            <footer style={{"padding":"20px","textAlign":"center","color":"white","background":"#4A6163"}}>
                &copy; 2021 <b><Link style={{"color":"rgba(255,255,255,0.5)","textDecoration":"underline"}} to='/'>ALMConnect</Link></b> All rights reserved.
            </footer>
        </>
    );
}

export default Footer;