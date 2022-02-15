import {React, useEffect, useRef, useState} from 'react';
import { withRouter } from "react-router-dom";
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import AdminNavbar from '../admin-navbar/AdminNavbar';

import "../../index.css";

function EditArea (props) {

    const textInput = useRef();

    const [areaBiranje, setAreaBiranje] = useState("Istorija");
    const [areas, setAreas] = useState([""]);
    const[areaOne, setAreaOne] = useState({area:``});
    let[counter, setCounter] = useState(0)
    

    useEffect(() =>{
        textInput.current.focus();
        setCounter(0)   
        setAreaBiranje(props.match.params.area)
        AuthService_admin.area()
        .then(res =>{
            setAreas(res.data);
        }) 
    },[])
    
    const filterArea = () =>{
     for (let index = 0; index < areas.length; index++) {
         const element = areas[index];
         if (element.area===areaBiranje) {
             setAreaOne(element)
         }
      }   
    }

    setTimeout(function (){
        if (counter<=2) {
            filterArea();
            setCounter(counter+1);
        }
      },200)

    const editArea = () => {
        AuthService_admin.updateArea(areaOne)
        .then(res =>{
            console.log(res);
        }) 
        props.history.push("/admin");
    }


    return (
        <div className="bg-info bg-opacity-50 edit-area admin">
            <div className="container">

                <AdminNavbar />

                <div className="px-3 py-4 bg-light">  

                    <div className="col-10 offset-1">
                        <h2 className="display-4 m-4">Edit Oblast</h2>
                        <div className="row">
                            <div className="col-10 offset-1">
                                <input onChange={e=>{setAreaOne({...areaOne,area:e.target.value})}} ref={textInput}  type="text" className="form-control" value={areaOne.area}/><br/>
                                <button onClick={editArea} className="form-control btn btn-info mb-5">Edit</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>     
    )
}

export default withRouter(EditArea);