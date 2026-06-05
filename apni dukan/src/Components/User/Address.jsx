import React, { use, useEffect, useState } from 'react'
import FormValidators from '../../Validators/FormValidators'
import { toast, ToastContainer } from 'react-toastify'

export default function Address() {
    let [user, setUser] = useState({})
    let [option, setOption] = useState("Create")
    let [index, setIndex] = useState(-1)
    const dataOptions = {
        name: "",
        email: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: ""
    }
    const errorMessageOptions = {
        name: "Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        address: "Address Field is Mendatory",
        pin: "Pin Field is Mendatory",
        city: "City Name Field is Mendatory",
        state: "State Field is Mendatory"
    }
    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
    let [show, setShow] = useState(false)

    let [showModal, setShowModal] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    function changeOption(option, index = -1) {
        setShowModal(true)
        setOption(option)
        if (option === "Create")
            setData({ ...dataOptions })
        else {
            setData({ ...user.address[index] })
            setErrorMessage({ ...dataOptions })
            setIndex(index)
        }
    }

    async function deleteAddress(index) {
        if (window.confirm("Are You Sure to Delete That Record")) {
            let address = user.address
            address.splice(index, 1)
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ ...user, address: address })
            })
            response = await response.json()
            setUser({ ...user, address: address })
            toast("Address Has Been Deleted")
        }
    }

    async function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let address = []
            if (option === "Create") {
                address = user.address ? user.address : []
                address.push({ ...data })
            }
            else {
                address = user.address
                address[index] = { ...data }
            }
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ ...user, address: address })
            })
            response = await response.json()
            setUser({ ...user, address: address })
            setShowModal(false)
            toast(`Address Has Been ${option === "Created" ? "Created" : 'Updated'}`)
            setData(dataOptions)
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            setUser({ ...response.data })
        })()
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="profile-section address-section addresses ">
                <div className="login-btn">
                    <button onClick={() => changeOption("Create")}
                        className="shop-btn">Add News Address</button>
                </div>
                <div className="row gy-md-0 g-5">
                    {
                        user.address?.map((item, index) => {
                            return <div className="col-md-12 mb-5" key={index}>
                                <div className="seller-info position-relative">
                                    <div className="btn-group position-absolute top-0 end-0">
                                        <button className='btn' onClick={() => changeOption("Update", index)}><i className='fs-2 bi bi-pencil'></i></button>
                                        <button className='btn' onClick={() => deleteAddress(index)}><i className='fs-2 bi bi-trash'></i></button>
                                    </div>
                                    <h5 className="heading">Address-{index + 1}</h5>
                                    <table>
                                        <tbody className='table table-bordered'>
                                            <tr>
                                                <th>Name</th>
                                                <td>{item.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{item.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{item.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{item.address}</td>
                                            </tr>
                                            <tr>
                                                <th>City</th>
                                                <td>{item.city}</td>
                                            </tr>
                                            <tr>
                                                <th>State</th>
                                                <td>{item.state}</td>
                                            </tr>
                                            <tr>
                                                <th>Pin</th>
                                                <td>{item.pin}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content p-5">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">{option} Address</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <form onSubmit={postData}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Email Address*</label>
                                        <input type="email" name="email" onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Phone Number*</label>
                                        <input type="text" name="phone" onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Address*</label>
                                        <textarea name="address" onChange={getInputData} value={data.address} className={`form-control ${show && errorMessage.address ? 'border-danger' : 'myborder'}`} placeholder='Address...' ></textarea>
                                        {show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>Pin Number*</label>
                                        <input type="text" name="pin" onChange={getInputData} value={data.pin} className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'myborder'}`} placeholder='Pin Number' />
                                        {show && errorMessage.pin ? <p className='text-danger'>{errorMessage.pin}</p> : null}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>City Name*</label>
                                        <input type="text" name="city" onChange={getInputData} value={data.city} className={`form-control ${show && errorMessage.city ? 'border-danger' : 'myborder'}`} placeholder='City Name' />
                                        {show && errorMessage.city ? <p className='text-danger'>{errorMessage.city}</p> : null}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>State Name*</label>
                                        <input type="text" name="state" onChange={getInputData} value={data.state} className={`form-control ${show && errorMessage.state ? 'border-danger' : 'myborder'}`} placeholder='State Name' />
                                        {show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary mybackground btn-lg w-100">{option}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
