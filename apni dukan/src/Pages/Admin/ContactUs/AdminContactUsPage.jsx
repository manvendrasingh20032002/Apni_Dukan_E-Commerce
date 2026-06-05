import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    function updateRecord(_id) {
        if (window.confirm("Are You Sure You Want to Change Status of That Record : ")) {
            let item = data.find(x => x._id === _id)
            let index = data.findIndex(x => x._id === _id)
            dispatch(updateContactUs({ ...item, status: !item.status }))
            data[index].status = !item.status
            setFlag(!flag)
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length)
                setData(ContactUsStateData)

            let time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>ContactUs</h6>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date</th>
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
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.subject?.slice(0, 20) + "..."}</td>
                                            <td>{item.message?.slice(0, 20) + "..."}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td onClick={() => updateRecord(item._id)} style={{ cursor: "pointer" }}>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link className='btn btn-primary fs-3 mybackground' to={`/admin/contactus/show/${item._id}`}><i className='bi bi-eye'></i></Link></td>
                                            <td>{item.status === false ? <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash fs-3'></i></button> : null}</td>
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
