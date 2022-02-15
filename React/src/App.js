import React from 'react';
// import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './login-registration/login/Login';
import Register from './login-registration/register/Register';
import HomeQuiz from './quiz/home-quiz/HomeQuiz';
import Admin from './admin/admin/Admin';
import RemoveUsers from './admin/remove-users/RemoveUsers';
import EditArea from './admin/editArea/EditArea';
import Question from './admin/question/Question';
import EditQuestion from './admin/editQuestion/EditQuestion';
import ChoosePlayer from './quiz/choose-player/ChoosePlayer';
import ChooseArea from './quiz/choose-area/ChooseArea';
import GameAdmin from './admin/game-admin/GameAdmin';
import Game from './quiz/game/Game';


import configureStore from './store/store';
import { Provider } from 'react-redux';
const store = configureStore();


function App() {


    return (

        <Provider store={store}>
            <BrowserRouter>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home_quiz" component={HomeQuiz} />
                <Route path="/admin" component={Admin} />
                <Route path="/game-admin" component={GameAdmin} />
                <Route path="/remove-users" exact component={RemoveUsers} />
                <Route  path="/edit/:area" component={EditArea} />
                <Route  path="/edit_question/:_id" component={EditQuestion} />
                <Route path="/question/:area" component={Question} />
                <Route path="/choose-player" component={ChoosePlayer} />
                <Route path="/choose-area" component={ChooseArea} />
                <Route path="/game" component={Game} />
            </BrowserRouter>
        </Provider>
    )
}


export default App;