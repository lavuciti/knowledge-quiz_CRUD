import { REMOVE_USER, STORE_USER } from "./types";
import {initialState} from "./initialState";

export const userReducer = (state = initialState,action) => {
    switch(action.type) {
        case STORE_USER:
            return {...state, ...action.payload};

        case REMOVE_USER:
            return {}

        default: return state;
    }
}