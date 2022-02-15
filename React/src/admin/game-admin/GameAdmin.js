import {React, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/actions';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import "../../index.css";

function Admin () {

    //useRef kada se nesto desi u input polju tada se pali useRaf u ovom slucaju fokusirali smo sa useEffect
    const idInput = useRef();
    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore);
    const history = useHistory();

    const [addNumberOfRounds, setAddNumberOfRounds] = useState({numberOfRounds:""})
    const [titleNumberOfRounds, setTitleNumberOfRounds] = useState("Dodaj broj rundi");
    const[warning, setWarning] = useState(false);


    useEffect(() =>{
        idInput.current.focus();
        onPlaceHolder()
    },[])

    const onPlaceHolder = () => {
        AuthService_admin.numberOfRounds()
        .then(res => {
            if (res.data[0]!== undefined) {
                setAddNumberOfRounds(res.data[0]);
                setTitleNumberOfRounds("Izmeni broj rundi")
            }else{
                // setPlaceHolder("Broj rundi")
            }
        })   
    }

    const numberOfRounds = () => {
        if(Number.isInteger(Number(addNumberOfRounds.numberOfRounds))&&Number(addNumberOfRounds.numberOfRounds)>0){
            AuthService_admin.numberOfRounds()
                .then(res => {
                    if (res.data[0]!== undefined) {
                        AuthService_admin.updateNumberOfRounds(addNumberOfRounds);
                        window.location.reload(false);
                    }else{
                        AuthService_admin.addNumberOfRounds(addNumberOfRounds);
                        window.location.reload(false);
                    }
                })
        }else{
            setWarning(true)
        }
    }

    

   

    return (
        <div className="bg-info bg-opacity-50 admin">
            <div className="container">


                <AdminNavbar />


                <div className="px-3 py-4 bg-light">  
                    <div className="row">
                        <div className="col-10 offset-1">
                            <h2 className="display-5 m-4">{titleNumberOfRounds}</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    {warning && <p className="text-danger mb-1 ms-2">Upisite pozitivan ceo broj</p>}  
                                    <input type="text" ref={idInput} onChange={e=>{setAddNumberOfRounds({...addNumberOfRounds, numberOfRounds:e.target.value})}} placeholder="Broj rundi" className="form-control" value={addNumberOfRounds.numberOfRounds}/><br/>
                                    <button onClick={numberOfRounds} className="btn btn-primary form-control">Save</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-10 offset-1">
                            <h2 className="display-5 m-4">Dodajte novog avatara</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>     
    )
}

export default Admin;