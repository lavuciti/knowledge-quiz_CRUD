import React from "react";
import AuthService_admin from "../auth-service_admin/auth-service_admin";

const OperaterUsersOrders = ({operater, start}) => {

    const deleteAccount = (id) => {
        const body = {_id: id};
        AuthService_admin.removeUsers(body)
        start()
    }

    return(
        <tr>
            <td>{operater._id}</td>
            <td>{operater.name}</td>
            <td><button onClick={()=>{deleteAccount(operater._id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    )
}

export default OperaterUsersOrders;