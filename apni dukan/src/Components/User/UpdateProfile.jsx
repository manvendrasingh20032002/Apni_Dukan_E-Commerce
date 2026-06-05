import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormValidators from '../../Validators/FormValidators'
export default function UpdateProfile({ setOption }) {
    let [data, setData] = useState({})
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${data._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            console.log(response)
            if (response.result === "Done")
                setOption("profile")
            else{
                 setShow(true)
                setErrorMessage(({ ...errorMessage, ...response.reason }))
            }
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
            if (response.result === "Done")
                setData(response.data)
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <form onSubmit={postData}>
                <div className="row">
                    <div className="col-12 mb-3">
                        <label>Name*</label>
                        <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                    </div>
                    <div className="col-12 mb-3">
                        <label>Phone*</label>
                        <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                    </div>
                    <div className="col-12 mb-3">
                        <label>User Name*</label>
                        <input type="text" name="username" value={data.username} onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                    </div>
                    <div className="col-12 mb-3">
                        <label>Email*</label>
                        <input type="email" name="email" value={data.email} onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                    </div>
                </div>
                <div className="col-12 mb-3 text-center">
                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Update Profile</button>
                </div>
            </form>
        </>
    )
}
