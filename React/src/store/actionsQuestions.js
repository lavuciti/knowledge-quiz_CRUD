import * as actionTypes from "./types";
import AuthService_admin from "../admin/auth-service_admin/auth-service_admin";
import AuthService_quiz from "../quiz/auth-service_quiz/auth-service_quiz"

//ovo je stavljeno zato sto dva puta prolazi kroz FATCH_QUESTIONS kada se prvi put ucita strana pa izgleda ruzno kada dva puta izmesa odgovore
let counter=0;

//pokrenuti midlwear kada se pokrene strana ili kada se reload
export const FETCH_QUESTIONS = (area, errCounter) => {
    return function(dispatch) {
        if (AuthService_quiz.getQuestionsData()===null) {
            //kada prvi put udjes i ne reload stranu
            if (errCounter) {
                counter++
            } 
            if (counter===1) {
                AuthService_admin.question()
                .then(res =>{
                    let randomizeFilteredQuestions = randomize(filteredQuestions(res.data, area));
                    dispatch(FETCH_QUESTIONS_SUCCESS(randomizeFilteredQuestions));
                    AuthService_quiz.storeQuestionsData(randomizeFilteredQuestions);
                })
                .catch(err => {
                    dispatch(FETCH_QUESTIONS_ERROR(err))
                })
            }else{
                //ovo je stavljeno zato sto dva puta prolazi kroz FATCH_QUESTIONS kada se prvi put ucita strana pa izgleda ruzno kada dva puta izmesa odgovore
                counter=0
            }

            
                
            
        }else{
            if (AuthService_quiz.getQuestionsData()!==null&&AuthService_quiz.getConfirmationData()===null) {
                //reload prvu stranu kad se udje
                dispatch(FETCH_QUESTIONS_SUCCESS(AuthService_quiz.getQuestionsData()));
            }else{
                if (AuthService_quiz.getConfirmationData()&&AuthService_quiz.getReloadCounterQuestionsData()===null&&AuthService_quiz.getReloadEndGameData()===null) {
                    //reload tacan odgovor
                    dispatch(FETCH_RELOAD_CONFIRMATION(AuthService_quiz.getQuestionsData(), AuthService_quiz.getResultData(), true, false ,AuthService_quiz.getCounterQuestionsData()));
                }else if (!AuthService_quiz.getConfirmationData()&&AuthService_quiz.getReloadCounterQuestionsData()===null&&AuthService_quiz.getReloadEndGameData()===null) {
                    //reload pogresan odgovor
                    console.log(!AuthService_quiz.getConfirmationData()&& AuthService_quiz.getReloadCounterQuestionsData()===null&& AuthService_quiz.getReloadEndGameData()===null);
                    dispatch(FETCH_RELOAD_CONFIRMATION(AuthService_quiz.getQuestionsData(), AuthService_quiz.getResultData(), false, true ,AuthService_quiz.getCounterQuestionsData()));    
                }else if (AuthService_quiz.getReloadEndGameData()){
                    //reload kraj igre
                    dispatch(FETCH_RELOAD_END_GAME(AuthService_quiz.getQuestionsData(), AuthService_quiz.getResultData(), AuthService_quiz.getCounterQuestionsData()))
                }else{
                    //reload sledece pitanje
                    dispatch(FETCH_RELOAD_NEXT_QUESTIONS(AuthService_quiz.getQuestionsData() ,AuthService_quiz.getReloadCounterQuestionsData(), AuthService_quiz.getResultData(), AuthService_quiz.getCounterQuestionsData()));
                }
            }
        }
    }
}


//filtrirati samo jednu oblast i mesanje pitanja
const filteredQuestions = (questions, area) =>{
    let filteredData = questions.filter(question=>{
    return question.area === area;
    })
    for (let index = 0; index < filteredData.length; index++) {
        const element = [filteredData[index].firstAnswer, filteredData[index].secondAnswer, filteredData[index].thirdAnswer, filteredData[index].fourthAnswer];
        const randomizeElement = randomize(element);
        filteredData[index].firstAnswer = randomizeElement[0];
        filteredData[index].secondAnswer = randomizeElement[1];
        filteredData[index].thirdAnswer = randomizeElement[2];
        filteredData[index].fourthAnswer = randomizeElement[3];
    }
    return filteredData;
}

//pomesati pitanja
const randomize =(arr)=>{
    let copyArr = [].concat(arr);
    let arrForExport = [];
    for (let i=0; i<arr.length; i++){
        let rand = Math.floor(Math.random() * copyArr.length);
        arrForExport.push(copyArr[rand]);
        copyArr.splice(rand, 1);
    }
    return arrForExport;
}

//midlwear za rezultat 
export const FETCH_MIDDLEWARE_RESULT = (confirmation, result, counterQuestions) => {
    return function(dispatch) {
        AuthService_quiz.storeConfirmationData(confirmation);
        AuthService_quiz.storeCounterQuestionsData(counterQuestions);
        AuthService_quiz.removeReloadCounterQuestionsData();
        if (confirmation) {
            dispatch(FETCH_RESULT(result+5, true, false));
            AuthService_quiz.storeResultData(result+5);
        }else{
            dispatch(FETCH_RESULT(result, false, true));
            AuthService_quiz.storeResultData(result);
        }
    }
}

//midlwear za sledece pitanje 
export const FETCH_MIDDLEWARE_COUNTER_QUESTION= (counterQuestions,  questionsLength) => {
    return function(dispatch) {
        if (counterQuestions<questionsLength) {
            AuthService_quiz.storeReloadCounterQuestionsData(counterQuestions);
            dispatch(FETCH_COUNTER_QUESTION(counterQuestions));
        }else{
            AuthService_quiz.storeReloadEndGameData(true);
            dispatch(FETCH_END_GAME())
        }
    }
}

export const FETCH_QUESTIONS_REQUEST = () => {
    return {
        type : actionTypes.FETCH_QUESTIONS_REQUEST
    }
}

export const FETCH_QUESTIONS_SUCCESS = (questions) => {
    return {
        type : actionTypes.FETCH_QUESTIONS_SUCCESS,
        payload:{
            questions: questions,
        }
    }
}

export const FETCH_QUESTIONS_ERROR = (err) => {
    return {
        type : actionTypes.FETCH_QUESTIONS_ERROR,
        payload:{
            err: err
        }
    }
}

export const FETCH_RESULT = (result, correct, wrong) => {
    return {
        type : actionTypes.FETCH_RESULT,
        payload:{
            result: result,
            correct: correct,
            wrong: wrong,
            loaded: false
        }
    }
}

export const FETCH_COUNTER_QUESTION = (counterQuestions) => {
    return {
        type : actionTypes.FETCH_COUNTER_QUESTION,
        payload:{
            counterQuestions: counterQuestions,
            correct: false,
            wrong: false,
            loaded: true
        }
    }
}

export const FETCH_END_GAME = () => {
    return {
        type : actionTypes.FETCH_END_GAME,
        payload:{
            correct: false,
            wrong: false,
            loaded: false,
            endGame: true,
        }
    }
}

export const FETCH_RELOAD_CONFIRMATION = (questions, result, correct, wrong, counterQuestions) => {
    return {
        type : actionTypes.FETCH_RELOAD_CONFIRMATION,
        payload:{
            questions: questions,
            result: result,
            correct: correct,
            wrong: wrong,
            loaded: false,
            counterQuestions,
            loading: false,
        }
    }
}

export const FETCH_RELOAD_NEXT_QUESTIONS = (questions, counterQuestions, result) => {
    return {
        type : actionTypes.FETCH_RELOAD_NEXT_QUESTIONS,
        payload:{
            questions: questions,
            counterQuestions: counterQuestions,
            result: result,
        }
    }
}

export const FETCH_RELOAD_END_GAME = (questions, result, counterQuestions) => {
    return {
        type : actionTypes.FETCH_RELOAD_END_GAME,
        payload:{
            questions: questions,
            counterQuestions: counterQuestions,
            result: result,
        }
    }
}

export const FETCH_RETURN_ON_START_GAME = () => {
    return {
        type : actionTypes.FETCH_RETURN_ON_START_GAME,
        payload:{
            loading: true,
            loaded: false,
            questions:[],
            error: false,
            errorMsg: false,
            counterQuestions: 0,
            result: 0,
            correct: false,
            wrong: false,
            endGame: false,
        }
    }
}