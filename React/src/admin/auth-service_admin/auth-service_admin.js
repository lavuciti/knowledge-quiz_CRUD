import axios from 'axios';

class AuthService_admin {

    static addArea(body){
        return axios.post('/addArea' ,body)
    }

    static adminUsers(){
        return axios.post('/adminUsers')
    }

    static removeUsers(body){
        return axios.post('/removeUsers', body)
    }

    static area(){
        return axios.post('/area')
    }

    static removeArea (body){
        return axios.post('/removeArea', body)
    }

    static updateArea (body){
        return axios.post('/updateArea', body)
    }

    static addQuestion (body){
        return axios.post('/addQuestion', body)
    }

    static question(body){
        return axios.post('/question' ,body)
    }

    static removeQuestion (body){
        return axios.post('/removeQuestion' ,body)
    }

    static updateQuestion (body){
        return axios.post('/updateQuestion', body)
    }

    static addNumberOfRounds (body){
        //add Number Of Rounds
        return axios.post('/addNumberOfRounds', body)
    }

    static numberOfRounds(){
        return axios.post('/numberOfRounds')
    }

    static updateNumberOfRounds (body){
        console.log(body);
        return axios.post('/updateNumberOfRounds', body)
    }

}




export default AuthService_admin;