import {React, useEffect, useState} from 'react';
import AuthService_admin from '../auth-service_admin/auth-service_admin';
import AuthService from '../../login-registration/auth-service_login-registration/auth-service_login-register';
import AdminNavbar from '../admin-navbar/AdminNavbar'
import AdminUsersOrders from './AdminUsersOrders';
import OperaterUsersOrders from './OperaterUsersOrders';
import {useHistory} from 'react-router-dom';

function RemoveUsers () {

    const history = useHistory();
    const [adminUsers, setAdminUsers] = useState([""]);
    const [operaterUsers, setOperaterUsers] = useState([""]);


    useEffect(() =>{
        if (AuthService.getUserData() === null || AuthService.getUserData().role !== "admin") {
            history.push('/')
        }
        start();
    },[])

    const start = () =>{
        AuthService_admin.adminUsers()
        .then(res =>{
            const newAdminUsers = res.data.filter(user=>user.role === "admin");
            const newOperUsers = res.data.filter(user=>user.role === "operater");
            setAdminUsers(newAdminUsers);
            setOperaterUsers(newOperUsers);
        })  
    }


    const allAdminUsers = adminUsers.map((admin, index)=>{
        return (
            <AdminUsersOrders admin={admin} key={index} start={start} />
        )
    })

    const allOperUsers = operaterUsers.map((operater, index)=>{
        return (
            <OperaterUsersOrders operater={operater} key={index} start={start} />
        )
    })

    return (
        <div className="bg-info bg-opacity-50 admin">
            <div className="container">

                <AdminNavbar />
                
                <div className="px-3 py-4 bg-light">
                    <div className="col-10 offset-1 bg-light">
                    <h3 className="display-4 m-4">User Admins</h3>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>UserAdmin</th>
                                        <th>RemoveUsers</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {allAdminUsers}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>

                    <div className="col-10 offset-1 bg-light">
                    <h3 className="display-4 m-4">User Operater</h3>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>UserOperater</th>
                                        <th>RemoveOperater</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {allOperUsers}

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

export default RemoveUsers;