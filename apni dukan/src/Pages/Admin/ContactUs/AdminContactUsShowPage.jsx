import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsShowPage() {
    let { _id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function deleteRecord() {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            navigate("/admin/contactus")
        }
    }

    function updateRecord() {
        if (window.confirm("Are You Sure You Want to Change Status of That Record : ")) {
            data.status = !data.status
            dispatch(updateContactUs({ ...data }))
            setFlag(!flag)
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                let item = ContactUsStateData.find(x => x._id === _id)
                setData(item)
            }
            else
                navigate("/admin/contactus")
        })()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>ContactUs Query<Link to="/admin/contactus"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link></h6>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>

                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{data.status ? "Active" : "Inactive"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.status ?
                                                    <button onClick={updateRecord} className='btn-lg btn btn-primary mybackground w-100'>Update</button> :
                                                    <button onClick={deleteRecord} className='btn-lg btn btn-danger w-100'>Delete</button>
                                            }
                                        </td>
                                    </tr>
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
