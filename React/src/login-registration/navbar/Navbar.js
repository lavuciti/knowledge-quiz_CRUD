import {React, useEffect} from 'react';
import {useState} from "react";
import AuthService from "../auth-service_login-registration/auth-service_login-register";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {removeUser} from '../../store/actions';

function Navbar (){

    const dispatch = useDispatch();
    const history = useHistory();
    const [navbar, setNavbar] = useState({link: "/", textNavbar: "Quiz"});
    

    useEffect(() =>{
        //moram ovako zato sto je ovde asinhrono programiranje ako uradim to u onRegister tada ne znam kako to da uradim
        if (AuthService.getUserData() != null && AuthService.getUserData().role==="admin") {
            setNavbar({link:"/admin", textNavbar: "Admin Page"});
        }
    },[])

    const onLogout = () => {
        AuthService.logout(history)
        dispatch(removeUser())
    }

    const actionButton = (AuthService.getUserData() === null)? (
        <>
            <li className="nav-item"><Link to="/" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
        </>
    ):
        <>
            <li className="nav-item"><Link to="/" className="nav-link" onClick={onLogout}>Logout</Link></li>
        </>

    return(
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link to={navbar.link} className="navbar-brand ps-2">{navbar.textNavbar}</Link>
            <ul className="navbar-nav ms-auto pe-2">

                {actionButton}

            </ul>
        </nav>
    )
}

export default Navbar;