import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
import FormValidators from '../../Validators/FormValidators'

const dataOptions = {
    message: "",
    star: 5,
    pid: ""
}
export default function Orders() {
    let [orders, setOrders] = useState([])
    let [reviews, setReviews] = useState([])

    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState('Message Field is Mendatory')
    let [show, setShow] = useState(false)
    let [showModal, setShowModal] = useState(false)
    let [option, setOption] = useState("Create")


    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    function createReview(pid, name) {
        setOption("Create")
        setData({ ...dataOptions, pid: pid, pname: name })
        setErrorMessage("Message Field is Mendatory")
        setShowModal(true)
    }

    function updateReview(pid, name) {
        setOption("Update")
        setErrorMessage("")
        setShowModal(true)

        let item = reviews.find(x => x.product?._id === pid)
        setData({ ...item, pid: pid, pname: name })
    }

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        if (name === "message")
            setErrorMessage(FormValidators(e))
    }

    function postData(e) {
        e.preventDefault()
        if (errorMessage) {
            setShow(true)
        }
        else {
            let item = {
                user: localStorage.getItem("userid"),
                name: localStorage.getItem("name"),
                pname: data.pname,
                product: data.pid,
                message: data.message,
                star: parseInt(data.star),
                date: new Date()
            }
            if (option === "Create") {
                dispatch(createTestimonial({ ...item }))
                setReviews([...reviews, item])
            }
            else {
                dispatch(updateTestimonial({ ...item, _id: data._id }))
                let index = reviews.findIndex(x => x.product?._id === data.pid)
                reviews[index].message = item.message
                reviews[index].star = item.star
                setReviews(reviews)
            }
        }

        setData(dataOptions)
        setErrorMessage("Message Field is Mendatory")
        setShowModal(false)
        setShow(false)
    }



    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setOrders(CheckoutStateData.filter(x=>x.user?._id===localStorage.getItem("userid")))
            }
        })()
    }, [CheckoutStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                setReviews(TestimonialStateData.filter(x => x.user?._id === localStorage.getItem("userid")))
            }
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                {orders.map((item) => {
                    return <div className='row mb-5' key={item._id}>
                        <div className="col-md-4">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Id</th>
                                            <td>{item._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>{item.orderStatus}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>{item.paymentMode}</td>
                                        </tr>

                                        <tr>
                                            <th>Payment Status</th>
                                            <td>{item.paymentStatus}

                                                {item.paymentStatus!=="Done"?
                                                <Link to={`/payment/${item._id}`} className='btn btn-primary m-3'>Pay Now</Link>:null}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{item.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{item.shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <th>RPPID</th>
                                            <td>{item.rppid ? item.rppid : "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-8">
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
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item?.products?.map((p, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`} height={80} width={100} alt="" />
                                                    </Link>
                                                </td>
                                                <td>{p.product?.name}</td>
                                                <td>{p.product?.brand?.name}</td>
                                                <td>{p.product?.color}</td>
                                                <td>{p.product?.size}</td>
                                                <td>&#8377;{p.product?.finalPrice}</td>
                                                <td>{p.qty}</td>
                                                <td>&#8377;{p.total}</td>
                                                <td><Link to={`/product/${p.product?._id}`} className='btn btn-primary mybackground  btn-lg'>Buy Again</Link></td>
                                                <td>
                                                    {item.orderStatus === "Delivered" ?
                                                        reviews.find(x => x.product?._id === p.product?._id) ?
                                                            <button className='btn btn-success  btn-lg' onClick={() => updateReview(p.product?._id, p.name)}>Update Review</button> :
                                                            <button className='btn btn-primary mybackground  btn-lg' onClick={() => createReview(p.product?._id, p.name)}>Write Review</button>
                                                        : null}
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2" id="exampleModalLabel">{option} Review</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <form onSubmit={postData}>
                            <div className="modal-body">
                                <textarea name="message" onChange={getInputData} value={data.message} className={`form-control ${show && errorMessage ? 'border-danger' : 'myborder'}`} placeholder='Write Your Review...' rows={5}></textarea>
                                {errorMessage && show ? <p className='text-danger'>{errorMessage}</p> : null}
                            </div>
                            <div className="modal-body">
                                <select name='star' onChange={getInputData} value={data.star} className='form-select myborder fs-3'>
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary btn-lg w-100 mybackground">{option}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
