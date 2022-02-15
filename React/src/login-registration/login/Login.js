import {React, useEffect} from 'react';
import {useState} from "react";
import AuthService from "../auth-service_login-registration/auth-service_login-register";
import AuthService_quiz from "../../quiz/auth-service_quiz/auth-service_quiz"
import {useDispatch} from "react-redux";
import {setUser} from "../../store/actions";
import {useHistory} from "react-router-dom";
import Navbar from '../navbar/Navbar';
import {FETCH_RETURN_ON_START_GAME} from '../../store/actionsQuestions';
import {FETCH_REMOVE_AREA} from '../../store/actionsAreas';


function Login(){

    const[state, setState] = useState({username: '', password: ''});
    const[warning, setWarning] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>{
        //ovde u auth-service posiva funkciju getUserData i ako u localStorage nema nista on salje na pocetnu stranu
        if (AuthService.getUserData() !== null) {
            if (AuthService.getUserData().name==="guest"||AuthService.getUserData().role==="operater"){
                if (AuthService_quiz.getAreaData()!==null) {
                    history.push('/game')
                }else{
                    history.push('/choose-player');
                }
            }else{
                history.push('/admin')
            }
        }
    },[])

    const onLogin = () => {
        AuthService.login(state)
        .then(res => {
            //ovde se pojavljuje kada se ukuca pogresan user i sifra
            if (res.data.name === "greska") {
                setWarning(true);
            }else{
                if (res.data.role === "operater") {
                    console.log(AuthService.getPlayerData);
                    console.log(res.data.token);
                    if (AuthService_quiz.getQuestionsData()!== null&&AuthService.getPlayerData().token===res.data.token) {
                        AuthService.storeUserData(res.data)
                        dispatch(setUser(res.data));  
                        history.push('/game'); 
                    }else{
                        AuthService.storeUserData(res.data);
                        AuthService_quiz.removeEndGame();
                        dispatch(FETCH_RETURN_ON_START_GAME());
                        dispatch(FETCH_REMOVE_AREA());
                        dispatch(setUser(res.data));   
                        history.push('/choose-player'); 
                    }
                }else{
                    AuthService.storeUserData(res.data)
                    dispatch(setUser(res.data));   
                    history.push('/admin');  
                }
            }     
        })
    }

    const onLoginGuest = () => {
        const res = {
            name: "guest"
        }
        AuthService.storeUserData(res);
        dispatch(setUser(res));
        AuthService_quiz.removeEndGame();
        dispatch(FETCH_RETURN_ON_START_GAME());
        dispatch(FETCH_REMOVE_AREA());
        history.push('/choose-player'); 
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Login</h1>
                <div className="col-6 offset-3">
                    {warning && <p className="text-danger mb-0">Upisite pravilno username</p>}
                    <input type="text" placeholder="name" className="form-control" 
                        onChange={event => setState({...state, username: event.target.value})}
                    /> <br/>
                    {warning && <p className="text-danger mb-0">Upisite pravilno sifru</p>}
                    <input type="password" placeholder="password" className="form-control"
                    onChange={event => setState({...state, password: event.target.value})}    
                    /> <br />
                    {warning && <p className="text-danger">Ako se niste registrovali registrujte se ili udjite kao gost</p>}
                    <button onClick={onLogin}className="btn btn-info">Login</button>

                    <div className="text-center mt-3 p-3 bg-light">
                        <p>Ukoliko necete da se registrujete mozete da se ulogujete kao gost.</p>
                        <button onClick={onLoginGuest}className="btn btn-warning">Login as a guest</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login;