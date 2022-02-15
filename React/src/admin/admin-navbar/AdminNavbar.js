import React from 'react';
import {Link} from "react-router-dom";
import {removeUser} from '../../store/actions';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import {useDispatch} from 'react-redux';

function AdminNavbar (){

    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = () => {
        AuthService.logout(history)
        dispatch(removeUser())
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-success bg-opacity-50 admin-navbar">
            <Link to="/admin" className="navbar-brand ps-2">Admin Page</Link>
            <ul className="navbar-nav ms-auto pe-2">
                <Link to="/game-admin" className="px-2">Game</Link>
                <Link to="/remove-users" className="px-2">Remove Users</Link>
                <Link to="/register" className="px-2">Register</Link>
                <a href="/" className="px-2" onClick={onLogout}>Logout</a>
            </ul>
        </nav>
    )
}

export default AdminNavbar;