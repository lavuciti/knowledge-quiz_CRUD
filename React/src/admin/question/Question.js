import {React, useEffect, useRef, useState} from 'react';
import { withRouter } from "react-router-dom";
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import QuestionMap from './QuestionMap';

import "../../index.css";

function Question (props) {

    const textInput = useRef();

    const [addQuestion, setAddQuestion] = useState({area: props.match.params.area, question:"", firstAnswer: "", secondAnswer: "", thirdAnswer: "", fourthAnswer: "", correctAnswer: ""});
    const [questions, setQuestions] = useState([""]);
    
    useEffect(() => {
        //poslali smo podatke state{counter:true} ako je counter true tada se fokusira ako nije tada ne
        if (props.location.state.counter) {
            textInput.current.focus();
        }
        start();
    },[])

    const start = (change) => {
        AuthService_admin.question()
        .then(res =>{
            const trueQuestion = res.data.filter(question => question.area == props.match.params.area);
            setQuestions(trueQuestion);
        })  
    }

    const addNewQuestion = () => {
        if (addQuestion.question===""||addQuestion.firstAnswer===""||addQuestion.secondAnswer===""||addQuestion.thirdAnswer===""||addQuestion.fourthAnswer===""||addQuestion.correctAnswer==="") {
            //popuniti sva polja poruka 
        }else{
            if (addQuestion.correctAnswer===addQuestion.firstAnswer||addQuestion.correctAnswer=== addQuestion.secondAnswer||addQuestion.correctAnswer===addQuestion.thirdAnswer||addQuestion.correctAnswer===addQuestion.fourthAnswer) {
                AuthService_admin.addQuestion(addQuestion)
                .then(res => {
                if(res.data === "Ok") { 
                    }
                })
                setAddQuestion({...addQuestion, question:"", firstAnswer: "", secondAnswer: "", thirdAnswer: "", fourthAnswer: "", correctAnswer: ""})  
                start();
            }
            //tacan odgovor i jedan od odgovora moraju da budu tacni
        }
    }

    const allQuestions = questions.map((question, index)=>{
        return (
            <QuestionMap question={question} key={index} start={start} />
        )
    })

    return (
        <div className="bg-info bg-opacity-50 edit-area admin">
            <div className="container">

                <AdminNavbar />

                <div className="px-3 py-4 bg-light h-100"> 
                    <div className="row">
                        <div className="col-10 offset-1">
                            <h2 className="display-5 m-4">Dodaj novo pitanje <b>{addQuestion.area}</b></h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <textarea type="text" ref={textInput} onChange={e=>{setAddQuestion({...addQuestion,question:e.target.value})}} placeholder="Pitanje" className="form-control" value={addQuestion.question}/><br/>
                                </div>
                            </div>
                            <h2 className="display-5 m-4">Dodaj odgovore</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <input type="text" onChange={e=>{setAddQuestion({...addQuestion,firstAnswer:e.target.value})}} placeholder="Prvi odgovor" className="form-control" value={addQuestion.firstAnswer}/><br/>
                                    <input type="text" onChange={e=>{setAddQuestion({...addQuestion,secondAnswer:e.target.value})}} placeholder="Drugi odgovor" className="form-control"value={addQuestion.secondAnswer}/><br/>
                                    <input type="text" onChange={e=>{setAddQuestion({...addQuestion,thirdAnswer:e.target.value})}} placeholder="Treci odgovor" className="form-control"value={addQuestion.thirdAnswer}/><br/>
                                    <input type="text" onChange={e=>{setAddQuestion({...addQuestion,fourthAnswer:e.target.value})}} placeholder="Cetvrti odgovor" className="form-control"value={addQuestion.fourthAnswer}/><br/>
                                </div>
                            </div>
                            <h2 className="display-5 m-4">Dodaj tacan odgovor <small className="fs-5 text text-danger">(mora da se slaze sa jednim od cetiri odgovora)</small></h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <input type="text" onChange={e=>{setAddQuestion({...addQuestion,correctAnswer:e.target.value})}} placeholder="Tacan odgovor" className="form-control" value={addQuestion.correctAnswer}/><br/>
                                    <button onClick={addNewQuestion} className="btn btn-primary form-control">Save</button>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <h3 className="display-5 m-4">Pitanja sa odgovorima <b>{addQuestion.area}</b></h3>
                            <small className="fs-5 text text-danger text-end d-block">(crveni odgovor je tacan)</small>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Pitanje</th>
                                                <th>Odg-1.</th>
                                                <th>Odg-2.</th>
                                                <th>Odg-3.</th>
                                                <th>Odg-4.</th>
                                                <th>Remove</th>
                                                <th>Edite</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {allQuestions}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    )
}

export default withRouter(Question);