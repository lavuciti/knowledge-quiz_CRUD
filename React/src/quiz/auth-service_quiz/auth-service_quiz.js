// import axios from 'axios';

class AuthService_quiz {

    static storeAreaData(area_data) {
        localStorage.setItem('area_data', JSON.stringify(area_data))
    }

    static getAreaData(){
        let areaData = localStorage.getItem('area_data');
        return areaData ? JSON.parse(areaData) : null;
    }

    static storeQuestionsData(questions_data) {
        localStorage.setItem('questions_data', JSON.stringify(questions_data))
    }

    static getQuestionsData(){
        let questionsData = localStorage.getItem('questions_data');
        return questionsData ? JSON.parse(questionsData) : null;
    }

    static storeConfirmationData(confirmation_data) {
        localStorage.setItem('confirmation_data', JSON.stringify(confirmation_data));
    }

    static getConfirmationData(){
        let confirmationData = localStorage.getItem('confirmation_data');
        return confirmationData ? JSON.parse(confirmationData) : null;
    }

    static storeCounterQuestionsData(counterQuestions_data) {
        localStorage.setItem('counterQuestions_data', JSON.stringify(counterQuestions_data));
    }

    static getCounterQuestionsData(){
        let counterQuestionsData = localStorage.getItem('counterQuestions_data');
        return counterQuestionsData ? JSON.parse(counterQuestionsData) : null;
    }

    static storeResultData(result_data) {
        localStorage.setItem('result_data', JSON.stringify(result_data));
    }

    static getResultData(){
        let resultData = localStorage.getItem('result_data');
        return resultData ? JSON.parse(resultData) : null;
    }

    static storeReloadCounterQuestionsData(reloadCounterQuestions_data) {
        localStorage.setItem('reloadCounterQuestions_data', JSON.stringify(reloadCounterQuestions_data));
    }

    static getReloadCounterQuestionsData(){
        let reloadCounterQuestionsData = localStorage.getItem('reloadCounterQuestions_data');
        return reloadCounterQuestionsData ? JSON.parse(reloadCounterQuestionsData) : null;
    }

    static removeReloadCounterQuestionsData(){
        localStorage.removeItem('reloadCounterQuestions_data');
    }

    static storeReloadEndGameData(reloadEndGame_data) {
        localStorage.setItem('reloadEndGame_data', JSON.stringify(reloadEndGame_data));
    }

    static getReloadEndGameData(){
        let reloadEndGameData = localStorage.getItem('reloadEndGame_data');
        return reloadEndGameData ? JSON.parse(reloadEndGameData) : null;
    }

    static removeEndGame(){
        localStorage.removeItem('reloadCounterQuestions_data');
        localStorage.removeItem('reloadEndGame_data');
        localStorage.removeItem('result_data');
        localStorage.removeItem('counterQuestions_data');
        localStorage.removeItem('confirmation_data');
        localStorage.removeItem('questions_data');
        localStorage.removeItem('questions_data');
        localStorage.removeItem('area_data');
    }
}

export default AuthService_quiz;