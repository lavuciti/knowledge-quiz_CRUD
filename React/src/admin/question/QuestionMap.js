import {React, useEffect, useState} from "react";
import AuthService_admin from "../auth-service_admin/auth-service_admin";
import { Link, useHistory } from "react-router-dom";


const QuestionMap = ({question, start}) => {

    let history = useHistory();

    const [redText, setRedText] = useState({first:"", second:"", third:"", fourth:""})

    useEffect(() => {
        if (question.correctAnswer===question.firstAnswer) {
            setRedText({...redText, first:"text-danger"});
        }else if (question.correctAnswer===question.secondAnswer){
            setRedText({...redText, second:"text-danger"});
        }else if (question.correctAnswer===question.thirdAnswer){
            setRedText({...redText, third:"text-danger"});
        }else{
            setRedText({...redText, fourth:"text-danger"});
        }
    },[])

    const deleteQuestion = (id) => {
        const body = {_id: id};
        AuthService_admin.removeQuestion(body)
        start()
    }

    return(
            <tr>
                <td>{question.question}</td>
                <td className={redText.first}>{question.firstAnswer}</td>
                <td className={redText.second}>{question.secondAnswer}</td>
                <td className={redText.third}>{question.thirdAnswer}</td>
                <td className={redText.fourth}>{question.fourthAnswer}</td>
                <td><button onClick={()=>{deleteQuestion(question._id)}} className="btn btn-danger">Delete</button></td>
                <td><Link to={{pathname:"/edit_question/"+question._id, state: { prevPath: history.location.pathname }}} className="btn btn-warning">Edit</Link></td>
            </tr>
    )
}

export default QuestionMap;