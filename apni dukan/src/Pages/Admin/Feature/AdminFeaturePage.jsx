import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
export default function AdminFeaturePage() {
    let [data, setData] = useState([])

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteFeature({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getFeature())
            if (FeatureStateData.length)
                setData(FeatureStateData)

            let time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [FeatureStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Feature
                            <Link to="/admin/feature/create"><i className='bi bi-plus text-light fs-1 float-end'></i></Link>
                        </h6>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>ShortDescription</th>
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
                                            <td>
                                                <div className='my-icon-2' dangerouslySetInnerHTML={{ __html: item.icon }} />
                                            </td>
                                            <td>{item.shortDescription}</td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/feature/update/${item._id}`} className='btn btn-primary mybackground'><i className='bi bi-pencil fs-3'></i></Link></td>
                                            <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash fs-3'></i></button> : null}</td>
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
