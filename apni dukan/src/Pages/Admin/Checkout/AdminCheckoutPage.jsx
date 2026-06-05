import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutPage() {
    let [data, setData] = useState([])

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        let time = (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length)
                setData(CheckoutStateData)

            let time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 500)
            return time
        })()
        return () => clearTimeout(time)
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Checkout</h6>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => {
                                        return <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.deliveryAddress?.name}, {item.deliveryAddress?.city}, {item.deliveryAddress?.pin}</td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.paymentMode}</td>
                                            <td>{item.paymentStatus}</td>
                                            <td>&#8377;{item.total}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td><Link className='btn btn-primary fs-3 mybackground' to={`/admin/checkout/show/${item._id}`}><i className='bi bi-eye'></i></Link></td>
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
