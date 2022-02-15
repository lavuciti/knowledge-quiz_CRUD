import * as actions from "./types";
import {areasState} from "./initialState";

export const areasReducer = (state = areasState,action) => {
    switch(action.type) {
        case actions.FETCH_AREAS_REQUEST:
            return {...state, loading: true};

        case actions.FETCH_AREAS_SUCCESS:
            return {
                loading: false,
                loaded: true,
                areas: action.payload.areas,
                error: false,
                errorMsg: false
            }
        
        case actions.FETCH_AREAS_ERROR:
            return {
                loading: false,
                loaded: false,
                areas:[],
                error: action.payload.err,
                errorMsg: true
            }    
        
        case actions.FETCH_AREA:
            return {...state, 
                area: action.payload.area
            };
        
        case actions.FETCH_REMOVE_AREA:
            return {...state, 
                loaded: false,
                areas:[{'area':''}],
                error: false,
                errorMsg: false,
                area:'',
                loading: true
                
            };

        default: return state;
    }
}