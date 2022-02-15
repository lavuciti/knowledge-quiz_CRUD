import {React} from "react";
import AuthService_admin from "../auth-service_admin/auth-service_admin";
import { Link } from "react-router-dom";


const Areas = ({area, start}) => {


    const deleteAccount = (id) => {
        const body = {_id: id};
        AuthService_admin.removeArea(body)
        start()
    }

    return(
        <tr className="area">
            <td><Link to={{pathname:"/question/"+area.area, state: { counter: true}}} className="text-black link">{area._id}</Link></td>
            <td><Link to={{pathname:"/question/"+area.area, state: { counter: true}}} className="text-black link">{area.area}</Link></td>
            <td><button onClick={()=>{deleteAccount(area._id)}} className="btn btn-danger">Delete</button></td>
            <td><Link to={"/edit/"+area.area} className="btn btn-warning">Edit</Link></td>
        </tr>
    )
}

export default Areas;