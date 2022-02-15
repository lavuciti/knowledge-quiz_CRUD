import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AuthService_quiz from '../auth-service_quiz/auth-service_quiz';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_AREA, FETCH_REMOVE_AREA} from '../../store/actionsAreas';
import {setUser, removeUser} from '../../store/actions';
import {FETCH_MIDDLEWARE_RESULT, FETCH_QUESTIONS, FETCH_MIDDLEWARE_COUNTER_QUESTION, FETCH_RETURN_ON_START_GAME} from '../../store/actionsQuestions';


function Game () {

    

    const dispatch = useDispatch();
    const areasStore = useSelector(store => store.areasStore);
    const userStore = useSelector(store => store.userStore);
    const questionsStore = useSelector(store => store.questionsStore);
    const history = useHistory();

    useEffect(() =>{
        //ovde u auth-service posiva funkciju getUserData i ako u localStorage nema nista on salje na pocetnu stranu
        if (AuthService.getUserData() === null) {
            history.push('/')
        }
        if (areasStore.area!==''&&userStore.avatar!==undefined) {
            dispatch(FETCH_QUESTIONS(areasStore.area, true))
        }
        if (areasStore.area==='') {
            dispatch(FETCH_AREA(AuthService_quiz.getAreaData()))
        }
        if (userStore.name===''||userStore.avatar===undefined) {
            dispatch(setUser(AuthService.getUserData()))
            dispatch(setUser(AuthService.getPlayerData()))
        }
    },[])

    useEffect(()=>{
        if (areasStore.area!==''&&userStore.name!=='') {
            dispatch(FETCH_QUESTIONS(areasStore.area, true))
        }
    },[userStore.name, areasStore.area])
    
    const answerCheck = (answer) => {
        if (answer===questionsStore.questions[questionsStore.counterQuestions].correctAnswer) {
            dispatch(FETCH_MIDDLEWARE_RESULT(true, questionsStore.result, questionsStore.counterQuestions))
        }else{
            dispatch(FETCH_MIDDLEWARE_RESULT(false, questionsStore.result, questionsStore.counterQuestions))
        }
    }
    
    const nextQuestion = () => {
        if (questionsStore.correct||questionsStore.wrong) {
            dispatch(FETCH_MIDDLEWARE_COUNTER_QUESTION(questionsStore.counterQuestions+1, questionsStore.questions.length));
        }
    }

    const restartTheGame = () => {
        AuthService_quiz.removeEndGame();
        dispatch(FETCH_RETURN_ON_START_GAME());
        dispatch(FETCH_REMOVE_AREA());
        history.push('choose-area');
    }

    const onLogout = () => {
        if (userStore.name==="guest") {
            dispatch(removeUser())
            AuthService.logout(history)
            AuthService_quiz.removeEndGame();
            dispatch(FETCH_RETURN_ON_START_GAME());
            dispatch(FETCH_REMOVE_AREA());
            
        }else{
            AuthService.logout(history)
            dispatch(removeUser())
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="player col-4 mt-5">
                        <div className="header d-flex justify-content-center align-items-center">
                            <button onClick={onLogout} className="logout btn btn-primary">Logout</button>
                            <h2 className="titleName">{userStore.player}</h2>
                        </div>
                        <div className="photo">
                            <img src={"./img/"+userStore.avatar+".jpg"} className="img-thumbnail" alt={userStore.avatar}></img>
                        </div>
                        <div className="text text-center">
                            <p>Ukupno poena: {questionsStore.result}</p>
                            <p>Pitanje {questionsStore.counterQuestions+1}</p>
                            <button onClick={nextQuestion} className="btn btn-primary">Sledeće Pitanje</button>
                        </div>
                    </div>
                    <div className="quiz col-8 mt-5 game">
                        <div className="d-flex flex-column">
                            <header className="d-flex justify-content-center align-items-center text-center ps-1 pe-1">
                                
                                {!questionsStore.endGame&&<h4>{questionsStore.questions[questionsStore.counterQuestions].question}</h4>}
                                
                                {questionsStore.endGame&&
                                    <div className="d-flex flex-column">
                                        <h4>Ukupno ste osvojili {questionsStore.result} bodova.</h4>
                                        <h3><span className="text-danger">*********</span>  Čestitamo  <span className="text-primary">*********</span></h3>
                                    </div>
                                }

                            </header>

                            {questionsStore.loaded &&
                                <div className="options d-flex row-fluid flex-wrap">
                                    <div onClick={()=>answerCheck(questionsStore.questions[questionsStore.counterQuestions].firstAnswer)} className="option d-flex justify-content-center align-items-center text-center">
                                        <p  className="optionButton">{questionsStore.questions[questionsStore.counterQuestions].firstAnswer}</p>
                                    </div>
                                    <div onClick={()=>answerCheck(questionsStore.questions[questionsStore.counterQuestions].secondAnswer)} className="option d-flex justify-content-center align-items-center text-center">
                                        <p  className="optionButton">{questionsStore.questions[questionsStore.counterQuestions].secondAnswer}</p>
                                    </div>
                                    <div onClick={()=>answerCheck(questionsStore.questions[questionsStore.counterQuestions].thirdAnswer)} className="option d-flex justify-content-center align-items-center text-center">
                                        <p  className="optionButton">{questionsStore.questions[questionsStore.counterQuestions].thirdAnswer}</p>
                                    </div>
                                    <div onClick={()=>answerCheck(questionsStore.questions[questionsStore.counterQuestions].fourthAnswer)} className="option d-flex justify-content-center align-items-center text-center">
                                        <p  className="optionButton">{questionsStore.questions[questionsStore.counterQuestions].fourthAnswer}</p>
                                    </div>
                                </div>
                            }

                            {questionsStore.endGame&&
                                <div className="answer d-flex justify-content-center text-center align-items-center flex-column">
                                    <h1 className="end-game">Izaberite oblast i pokrenite ponovo igru...</h1>
                                    <button onClick={restartTheGame} className="btn btn-success">Kliknite</button>
                                </div>
                            }

                            {questionsStore.correct&&
                                <div className="answer d-flex justify-content-center align-items-center">
                                    <h1 className="correct">Tacan odgovor</h1>
                                    <button onClick={restartTheGame} className="correctBtn btn btn-danger">Back</button>
                                </div>
                            }

                            {questionsStore.wrong&&
                                <div className="answer d-flex flex-column justify-content-center align-items-center">
                                    <h1 className="wrong">Pogresan odgovor</h1>
                                    <h4>Tacan odogovor je: {questionsStore.questions[questionsStore.counterQuestions].correctAnswer}</h4>
                                    <button onClick={restartTheGame} className="correctBtn btn btn-danger">Back</button>

                                </div>
                            }

                            {questionsStore.loading &&
                            <div className="loading d-flex justify-content-center align-items-center">
                                <p>Loading...</p>
                            </div>
                            }

                            {questionsStore.errorMsg &&
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

export default Game;