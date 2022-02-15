import {React, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, removeUser} from '../../store/actions';
import Navbar from '../../login-registration/navbar/Navbar';

function HomeQuiz () {

    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore);
    const history = useHistory();

    useEffect(() =>{
        //ovde u auth-service posiva funkciju getUserData i ako u localStorage nema nista on salje na pocetnu stranu
        if (AuthService.getUserData() === null) {
            history.push('/')
        }
        //ovde dispatch u actions.js funkciju setUser i ako u lokal storage postoji nesto on salje sta je nasao i to je nama sada state sa kojim mozemo da udemo u home
        if (userStore) {
            dispatch(setUser(AuthService.getUserData()))            
        }
    },[])

    const onLogout = () => {
        AuthService.logout(history)
        dispatch(removeUser())
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Home Page</h1>
                <h2>Hello {userStore.name}</h2>
                <button className="btn btn-warning" onClick={onLogout}>Logout</button>
            </div>
        </div>        
    )
}

export default HomeQuiz;