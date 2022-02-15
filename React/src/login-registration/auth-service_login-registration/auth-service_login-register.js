import axios from 'axios';

class AuthService {
    static register(body){
        //Save new user
        return axios.post('/register', body);
    }

    static updateUsers(body){
        //Update new user
        return axios.post('/updateUsers', body);
    }

    static login(body){
        return axios.post('/login' ,body)
    }

    static logout(history){
        localStorage.removeItem('app_user_data');
        history.push('/');
    }

    static storeUserData(user_data) {
        localStorage.setItem('app_user_data', JSON.stringify(user_data))
    }

    static getUserData(){
        let userData = localStorage.getItem('app_user_data');
        return userData ? JSON.parse(userData) : null;
    }

    static storePlayerData(player_data) {
        localStorage.setItem('app_player_data', JSON.stringify(player_data))
    }

    static getPlayerData(){
        let playerData = localStorage.getItem('app_player_data');
        return playerData ? JSON.parse(playerData) : null;
    }
}

export default AuthService;