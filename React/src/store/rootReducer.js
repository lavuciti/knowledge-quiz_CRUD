import { userReducer } from "./reducerUser";
import { areasReducer } from "./reducerAreas";
import { questionsReducer } from "./reducerQuestions"
import { combineReducers } from "redux";



const rootReducer = () =>
	combineReducers({
		userStore: userReducer,
        areasStore: areasReducer,
		questionsStore: questionsReducer
	});


export default rootReducer;