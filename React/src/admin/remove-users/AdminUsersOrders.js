import {React, useState, useEffect} from "react";
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AuthService_admin from "../auth-service_admin/auth-service_admin";

const AdminUsersOrders = ({admin, start}) => {

    const [adminUser, setAdminUser] = useState([""]);

    useEffect(() =>{
        setAdminUser(AuthService.getUserData().name)
    },[])

    const actionButton = adminUser !== admin.name ? (
        <>
            <td><button onClick={()=>{deleteAccount(admin._id)}} className="btn btn-danger">Delete</button></td>
        </>
    ) : <>
            <td></td>
        </>

    const deleteAccount = (id) => {
        const body = {_id: id};
        AuthService_admin.removeUsers(body)
        start()
    }

    return(
        <tr>
            <td>{admin._id}</td>
            <td>{admin.name}</td>
            {actionButton}
        </tr>
    )
}

export default AdminUsersOrders;