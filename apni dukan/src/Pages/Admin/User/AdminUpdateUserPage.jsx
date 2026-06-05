import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminUpdateUserPage() {
    let { _id } = useParams()
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin"
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target

        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = UserStateData.find(x => x._id !== _id && (x.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()))
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username: item.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                    email: item.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Registered" : "",
                })
            }
            else {
                dispatch(updateUser({ ...data }))
                navigate("/admin/user")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x._id === _id)
                if (item) {
                    setData({ ...data, ...item })
                }
                else
                    navigate("/admin/user")
            }
        })()
    }, [UserStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Update User
                            <Link to="/admin/user"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
                        </h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>User Name*</label>
                                    <input type="text" name="username" value={data.username} onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" value={data.role} onChange={getInputData} className='form-select myborder'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select myborder'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button type='submit' className="btn btn-primary mybackground btn-lg p-3 my-3 w-100 border-0">Update an Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
