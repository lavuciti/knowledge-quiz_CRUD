import * as actionTypes from "./types";
import AuthService_admin from "../admin/auth-service_admin/auth-service_admin";

//pokrenuti midlwear
export const FETCH_AREAS = () => {
    return function(dispatch) {
        AuthService_admin.area()
        .then(res =>{
            dispatch(FETCH_AREAS_SUCCESS(randomize(res.data)))
        })
        .catch(err => {
            dispatch(FETCH_AREAS_ERROR(err))
        })
    }
}

// pomesati oblasti
const randomize =(arr)=>{
    let copyArr = [].concat(arr);
    let arrForExport = [];
    for (let i=0; i<4; i++){
        let rand = Math.floor(Math.random() * copyArr.length);
        arrForExport.push(copyArr[rand]);
        copyArr.splice(rand, 1);
    }
    return arrForExport;
}

export const FETCH_AREAS_REQUEST = () => {
    return {
        type : actionTypes.FETCH_AREAS_REQUEST
    }
}

export const FETCH_AREAS_SUCCESS = (areas) => {
    return {
        type : actionTypes.FETCH_AREAS_SUCCESS,
        payload:{
            areas: areas
        }
    }
}

export const FETCH_AREAS_ERROR = (err) => {
    return {
        type : actionTypes.FETCH_AREAS_ERROR,
        payload:{
            err: err
        }
    }
}

export const FETCH_AREA = (area) => {
    return {
        type : actionTypes.FETCH_AREA,
        payload:{
            area: area
        }
    }
}

export const FETCH_REMOVE_AREA = () => {
    return {
        type : actionTypes.FETCH_REMOVE_AREA,
    }
}