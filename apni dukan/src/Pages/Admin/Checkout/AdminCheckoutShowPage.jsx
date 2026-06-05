import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getCheckout, deleteCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutShowPage() {
    let { _id } = useParams()
    let [data, setData] = useState({})

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function updateRecord() {
        if (window.confirm("Are You Sure You Want to Change Status of That Record : ")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setData({ ...data })
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x._id === _id)
                if (item) {
                    setData(item)
                    setOrderStatus(item.orderStatus)
                    setPaymentStatus(item.paymentStatus)
                }
                else
                    navigate("/admin/checkout")
            }
            else
                setData([])
        })()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Checkout Query<Link to="/admin/checkout"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link></h6>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>
                                            {data?.deliveryAddress?.name}<br />
                                            {data?.deliveryAddress?.email},{data?.deliveryAddress?.phone}<br />
                                            {data?.deliveryAddress?.address}<br />
                                            {data?.deliveryAddress?.pin},{data?.deliveryAddress?.city},{data?.deliveryAddress?.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}

                                            {data.orderStatus !== "Delivered" ?
                                                <select className='form-select my-3 myborder' onChange={(e) => setOrderStatus(e.target.value)} value={data.orderStatus}>
                                                    <option>Order is Placed</option>
                                                    <option>Order is Ready to Pack</option>
                                                    <option>Order is Packed</option>
                                                    <option>Order is Ready to Ship</option>
                                                    <option>Order is Shipped</option>
                                                    <option>Order is in Transit</option>
                                                    <option>Order is Reached at the Final Delivery Station</option>
                                                    <option>Order is Out for Delivery</option>
                                                    <option>Delivered</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>

                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {data.paymentStatus !== "Done" ?
                                                <select className='form-select my-3 myborder' onChange={(e) => setPaymentStatus(e.target.value)} value={data.paymentStatus}>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                    <button onClick={updateRecord} className='btn-lg btn btn-primary mybackground w-100'>Update</button> :
                                                    null
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h6 className='mybackground text-light text-center p-2 fs-1 my-3'>Products In This Order</h6>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.products?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>
                                                <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} target='_blank' rel='noreferrer'>
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} height={80} width={100} alt="" />
                                                </Link>
                                            </td>
                                            <td>{item.product?.name}</td>
                                            <td>{item.product?.brand?.name}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.product?.finalPrice}</td>
                                            <td>{item.qty}</td>
                                            <td>&#8377;{item.total}</td>
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
