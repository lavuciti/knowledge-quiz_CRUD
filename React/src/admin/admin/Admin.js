import {React, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/actions';
import AdminNavbar from '../admin-navbar/AdminNavbar';
import Areas from '../areas/Areas'
import "../../index.css";

function Admin () {

    //useRef kada se nesto desi u input polju tada se pali useRaf u ovom slucaju fokusirali smo sa useEffect
    const idInput = useRef();
    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore);
    const history = useHistory();

    const [addArea, setAddArea] = useState('');
    const[area, setArea] = useState(['']);

    useEffect(() =>{
        start();  
        idInput.current.focus();
        if (AuthService.getUserData() === null || AuthService.getUserData().role !== "admin") {
            history.push('/')
        }
        if (userStore) {
            dispatch(setUser(AuthService.getUserData()))            
        }
    },[])

    const start = () =>{
        AuthService_admin.area()
        .then(res =>{
            setArea(res.data);
        })  
    }

    const addNewArea = () => {
        //ovo se stavlja da ne bi moglo da upise u bazu slucajno prazno polje kad se stisne save
        if (addArea !== "") {
            AuthService_admin.addArea(addArea)
            .then(res => {
            if(res.data === "Ok") {
                idInput.current.value=""; 
                idInput.current.focus(); 
                }
            })
        }
        start();
        setAddArea('')
    }

    const allAreas = area.map((area, index)=>{
        return (
            <Areas area={area} key={index} start={start} />
        )
    })

    return (
        <div className="bg-info bg-opacity-50 admin">
            <div className="container">


                <AdminNavbar />


                <div className="px-3 py-4 bg-light">  
                    <h2 className="pb-1">Zdravo {userStore.name}</h2>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <h2 className="display-5 m-4">Dodaj novu oblast</h2>
                            <div className="row">
                                <div className="col-10 offset-1">
                                    <input type="text" ref={idInput} onChange={e=>{setAddArea({...addArea,addArea:e.target.value})}} placeholder="Oblast" className="form-control"/><br/>
                                    <button onClick={addNewArea} className="btn btn-primary form-control">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-10 offset-1 bg-light">
                    <h3 className="display-4 m-4">Oblasti <small className="fs-5 text text-danger">(kliknite na jednu od oblasti ili id da biste videli pitanja i odgovore za datu oblast)</small></h3>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Oblast</th>
                                        <th>RemoveOblast</th>
                                        <th>EditeOblast</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {allAreas}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>     
    )
}

export default Admin;