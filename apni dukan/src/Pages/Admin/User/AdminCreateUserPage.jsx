import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getUser, createUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminCreateUserPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        role: "Admin"
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory",
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
        else if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, password: 'Password And Confirm Password Does not Matched' })
        }
        else {
            let item = UserStateData.find(x => x.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username: item.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                    email: item.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Registered" : "",
                })
            }
            else {
                dispatch(createUser({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    role: data.role,
                    status: true,
                    option:"Admin"
                }))
                navigate("/admin/user")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
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
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Create User
                            <Link to="/admin/user"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
                        </h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>User Name*</label>
                                    <input type="text" name="username" onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="email" name="email" onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" onChange={getInputData} className='form-select myborder'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select myborder'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button type='submit' className="btn btn-primary mybackground btn-lg p-3 my-3 w-100 border-0">Create an Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
