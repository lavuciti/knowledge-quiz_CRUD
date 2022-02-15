import {React, useEffect} from 'react';
import {useState} from "react";
import AuthService from "../auth-service_login-registration/auth-service_login-register";
import {useHistory} from "react-router-dom";
import Navbar from '../navbar/Navbar';

function Register(){

    const [state, setState] = useState({name:'', pass:'', role:''});
    const [textRegister, setTextRegister] = useState({textRegister: "Register"});

    const history = useHistory();


    useEffect(() =>{
        //moram ovako zato sto je ovde asinhrono programiranje ako uradim to u onRegister tada ne znam kako to da uradim
        if (AuthService.getUserData() === null) {
            setState({...state, role: 'operater'});
        } else{
            setState({...state, role: 'admin'})
            setTextRegister({textRegister: "Register Admin"})
        }
    },[])

    const onRegister = () =>{
        if (AuthService.getUserData() === null) {
            AuthService.register(state)
            .then(res => {
                if(res.data === "Ok") {
                    history.push('/')
                } else {
                    history.push('/register')
                }
            })
        } else{
            AuthService.register(state)
            .then(res => {
                if(res.data === "Ok") { 
                    history.push('/admin')
                } else {
                    history.push('/register')
                }
            })
        }
    }

    const actionButton = (AuthService.getUserData() === null)? (
        <>
            <button onClick={onRegister} className="btn btn-primary">Login</button>
        </>
    ):
        
        <>
        <button onClick={onRegister} className="btn btn-primary">Register</button>
        </>

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>{textRegister.textRegister}</h1>
                <div className="col-6 offset-3">
                    <input type="text" placeholder="name" value={state.name} className="form-control" 
                    onChange={event => setState({...state, name: event.target.value})}
                    /> <br/>
                    <input type="password" placeholder="password" className="form-control"
                    onChange={event => setState({...state, pass: event.target.value})}
                    
                    /> <br />
                    {actionButton}
                </div>
            </div>
        </div>
    )
}


export default Register;