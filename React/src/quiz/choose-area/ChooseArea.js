import {React, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AuthService_quiz from '../auth-service_quiz/auth-service_quiz';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_AREAS, FETCH_AREA} from '../../store/actionsAreas';
import {removeUser} from '../../store/actions';


function ChoosePlayer () {

    const dispatch = useDispatch();
    const areasStore = useSelector(store => store.areasStore);
    const history = useHistory();

   
    useEffect(() =>{
        //ovde u auth-service posiva funkciju getUserData i ako u localStorage nema nista on salje na pocetnu stranu
        if (AuthService.getUserData() === null) {
            history.push('/')
        }
        dispatch(FETCH_AREAS());
    },[])

    const onLogout = () => {
        AuthService.logout(history)
        dispatch(removeUser())
    }

    const onBack = () => {
        history.push('/choose-player')
    }

    const saveArea = (area) =>{
        dispatch(FETCH_AREA(area));
        AuthService_quiz.storeAreaData(area);
        history.push('/game');
    }

    const allAreas = areasStore.areas.map((area, index)=>{
        return (
            <div  key={index} onClick={()=>saveArea(area.area)} className="option d-flex justify-content-center align-items-center text-center">
                <p className="optionButton">{area.area}</p>
            </div>
        )
    })

    return (
        <>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="quiz choose-area col-8 mt-5">
                        <div className="d-flex flex-column">
                            <header className="d-flex justify-content-center align-items-center">
                                <h1 className="title">Izaberite oblast</h1>
                                <button onClick={onLogout} className="logout btn btn-primary">Logout</button>
                                <button onClick={onBack} className="back btn btn-danger">Back</button>
                            </header>

                            {areasStore.loaded &&
                                <div className="options d-flex row-fluid flex-wrap">
                                {allAreas}
                                </div>
                            }

                            {areasStore.loading &&
                                <div className="loading d-flex justify-content-center align-items-center">
                                    <p>Loading...</p>
                                </div>
                            }

                            {areasStore.errorMsg &&
                                <div className="loading d-flex justify-content-center align-items-center">
                                    <p>{areasStore.error.toString()}</p>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>        
    )
}

export default ChoosePlayer;