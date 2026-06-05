import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getUser, deleteUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminUserPage() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteUser({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    function updateRecord(_id) {
        if (window.confirm("Are You Sure You Want to Change Status of That Record : ")) {
            let item = data.find(x => x._id === _id)
            let index = data.findIndex(x => x._id === _id)
            dispatch(updateUser({ ...item, status: !item.status }))
            data[index].status = !item.status
            setFlag(!flag)
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getUser())
            if (UserStateData.length)
                setData(UserStateData)

            let time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [UserStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Users
                            <Link to="/admin/user/create"><i className='bi bi-plus text-light fs-1 float-end'></i></Link>
                        </h6>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => {
                                        return <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.role}</td>
                                            <td onClick={() => updateRecord(item._id)} style={{ cursor: "pointer" }}>{item.status ? "Active" : "Inactive"}</td>
                                            <td>{item.role === "Buyer" ? null : <Link to={`/admin/user/update/${item._id}`} className='btn btn-primary mybackground'><i className='bi bi-pencil fs-3'></i></Link>}</td>
                                            <td><button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash fs-3'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
