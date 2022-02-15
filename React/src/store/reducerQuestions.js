import * as actions from "./types";
import {questionsState} from "./initialState";

export const questionsReducer = (state = questionsState,action) => {
    switch(action.type) {
        case actions.FETCH_QUESTIONS_REQUEST:
            return {...state, loading: true};

        case actions.FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload.questions,
                loaded: true,
                endGame: false
            }
        
        case actions.FETCH_QUESTIONS_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                questions:[],
                error: action.payload.err,
                errorMsg: true
            }    
        
        case actions.FETCH_RESULT:
            return {...state, 
                result: action.payload.result,
                correct: action.payload.correct,
                wrong: action.payload.wrong,
                loaded: action.payload.loaded
            };

        case actions.FETCH_COUNTER_QUESTION:
            return {...state, 
                counterQuestions: action.payload.counterQuestions,
                correct: action.payload.correct,
                wrong: action.payload.wrong,
                loaded: action.payload.loaded
            };
        
        case actions.FETCH_END_GAME:
            return {...state, 
                correct: action.payload.correct,
                wrong: action.payload.wrong,
                loaded: action.payload.loaded,
                endGame: action.payload.endGame
            };
        
        case actions.FETCH_RELOAD_CONFIRMATION:
            return {...state, 
                questions: action.payload.questions,
                result: action.payload.result,
                correct: action.payload.correct,
                wrong: action.payload.wrong,
                loaded: false,
                counterQuestions: action.payload.counterQuestions,
                loading: false
            };
        
        case actions.FETCH_RELOAD_NEXT_QUESTIONS:
            return {...state, 
                questions: action.payload.questions,
                counterQuestions: action.payload.counterQuestions,
                result: action.payload.result,
                correct: false,
                wrong: false,
                loaded: true,
                loading: false
            };

            case actions.FETCH_RELOAD_END_GAME:
            return {...state, 
                questions: action.payload.questions,
                counterQuestions: action.payload.counterQuestions,
                result: action.payload.result,
                correct: false,
                wrong: false,
                loaded: false,
                endGame: true,
                loading: false
            };

            case actions.FETCH_RETURN_ON_START_GAME:
            return {...state, 
                loading: true,
                loaded: false,
                questions:[{'area':''}],
                error: false,
                errorMsg: false,
                counterQuestions: 0,
                result: 0,
                correct: false,
                wrong: false,
                endGame: false,
            };

        default: return state;
    }
}