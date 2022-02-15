import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/actions';
import Navbar from '../../login-registration/navbar/Navbar';

function ChoosePlayer () {

    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore);
    const history = useHistory();

    
    const arrayPhoto = ["Ivo", "Justina", "Horhe", "Vladanka", "Kristina", "Lav"];
    const [counter, setCounter] = useState(0);
    const [photo, setphoto] = useState(arrayPhoto[counter]);
    const[state, setState] = useState({});
    const[warning, setWarning] = useState(false);


    useEffect(() =>{
        setState(AuthService.getUserData())
        //ovde u auth-service posiva funkciju getUserData i ako u localStorage nema nista on salje na pocetnu stranu
        if (AuthService.getUserData() === null) {
            history.push('/')
        }
        //ovde dispatch u actions.js funkciju setUser i ako u lokal storage postoji nesto on salje sta je nasao i to je nama sada state sa kojim mozemo da udemo u home
        if (userStore) {
            dispatch(setUser(AuthService.getUserData()))            
        }
    },[])

    //ovo se stavlja zato sto kada se ubaci u fun right i left nece da radi kako treba. Nece da prebacuje slike odmah 
    useEffect(() =>{
        setphoto(arrayPhoto[counter])
    },[counter])

    const rightSlide = () => {  
        if (counter<5) {
            setCounter(counter+1)
        }else{
            setCounter(0);
        } 
    }

    const leftSlide = () => {   
        if (counter>0) {
            setCounter(counter-1);
        }else{
            setCounter(5);
        } 
    }

    const savePlayer = () => {
        if (state.player!==undefined) {
                dispatch(setUser(state));
                AuthService.storePlayerData(state)
                history.push('/choose-area');
            if (state.name!=="guest") {
                AuthService.updateUsers(state)
            }   
        }
        else{
            setWarning(true)
        }  
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5 text-center choose-player p-5">
                <div className="card">
                    <img src={"./img/"+photo+".jpg"} className="card-img-top img-fluid p-3" alt="..."></img>
                    <p className="position-absolute top-50 end-0 translate-middle"> <i className="arrow right p-2" onClick={rightSlide}></i></p>
                    <p className="position-absolute top-50 start-0 translate-middle"><i className="arrow left p-2" onClick={leftSlide}></i></p>
                </div>
                <h5 className="card-title mb-5 mt-1">Kliknite na strelice levo i desno i izaberite avatara</h5>
                {warning && <p className="text-warning text-end fw-bold">*  Upišite ime igraca</p>}
                <input onChange={e=>{setState({player:e.target.value, avatar: photo, token: state.token})}} type="text"  placeholder="Upišite ime igrača" className="form-control"/><br/>
                <p href="#" className="btn btn-primary form-control" onClick={savePlayer}>Save</p>
            </div>
        </>        
    )
}

export default ChoosePlayer;