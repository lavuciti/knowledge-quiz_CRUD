import {React, useEffect, useRef, useState} from 'react';
import { withRouter } from "react-router-dom";
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import AdminNavbar from '../admin-navbar/AdminNavbar';

// import "../../index.css";

function EditQuestion (props) {

    const textInput = useRef();
    const [question, setQuestion] = useState({area: props.match.params.area, question:" ", firstAnswer: " ", secondAnswer: "", thirdAnswer: "", fourthAnswer: "", correctAnswer: ""});

    useEffect(() =>{
        textInput.current.focus(); 
        AuthService_admin.question()
        .then(res =>{
            const realQuestion = res.data.filter(pet => pet._id === props.match.params._id)[0];
            setQuestion(realQuestion);
        }) 
    },[])

    const addEditQuestion = () => {
        if (question.question===""||question.firstAnswer===""||question.secondAnswer===""||question.thirdAnswer===""||question.fourthAnswer===""||question.correctAnswer==="") {
            //popuniti sva polja poruka 
        }else{
            if (question.correctAnswer===question.firstAnswer||question.correctAnswer=== question.secondAnswer||question.correctAnswer===question.thirdAnswer||question.correctAnswer===question.fourthAnswer) {
                AuthService_admin.updateQuestion(question)
                .then(res =>{
                    console.log(res);
                }) 
                props.history.push({pathname:props.history.location.state.prevPath ,state: { counter: false}})
            }
            //tacan odgovor i jedan od odgovora moraju da budu tacni
        }
    }

    return (
        <div className="bg-info bg-opacity-50 edit-area admin">
            <div className="container">

                <AdminNavbar />
                <div className="px-3 py-4 bg-light h-100"> 
                    <div className="row">
                        <div className="col-10 offset-1">
                            <h2 className="display-5 m-4">Edit novo pitanje</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <textarea type="text" ref={textInput} onChange={e=>{setQuestion({...question,question:e.target.value})}} placeholder="Pitanje" className="form-control" value={question.question}/><br/>
                                </div>
                            </div>
                            <h2 className="display-5 m-4">Edit odgovore</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <input type="text" onChange={e=>{setQuestion({...question,firstAnswer:e.target.value})}} placeholder="Prvi odgovor" className="form-control" value={question.firstAnswer}/><br/>
                                    <input type="text" onChange={e=>{setQuestion({...question,secondAnswer:e.target.value})}} placeholder="Drugi odgovor" className="form-control"value={question.secondAnswer}/><br/>
                                    <input type="text" onChange={e=>{setQuestion({...question,thirdAnswer:e.target.value})}} placeholder="Treci odgovor" className="form-control"value={question.thirdAnswer}/><br/>
                                    <input type="text" onChange={e=>{setQuestion({...question,fourthAnswer:e.target.value})}} placeholder="Cetvrti odgovor" className="form-control"value={question.fourthAnswer}/><br/>
                                </div>
                            </div>
                            <h2 className="display-5 m-4">Edit tacan odgovor <small className="fs-5 text text-danger">(mora da se slaze sa jednim od cetiri odgovora)</small></h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <input type="text" onChange={e=>{setQuestion({...question,correctAnswer:e.target.value})}} placeholder="Tacan odgovor" className="form-control" value={question.correctAnswer}/><br/>
                                    <button onClick={addEditQuestion} className="btn btn-primary form-control">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>     
    )
}

export default withRouter(EditQuestion);