import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import FormValidators from '../../Validators/FormValidators'
export default function ChangePassword() {
    let [user, setUser] = useState({})
    let [data, setData] = useState({
        password: '',
        cpassword: ''
    })
    let [errorMessage, setErrorMessage] = useState("")
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setShow(false)
        setData({ ...data, [name]: value })
        if (name === "password")
            setErrorMessage(FormValidators(e))
    }

    async function postData(e) {
        e.preventDefault()
        if (errorMessage)
            setShow(true)
        else if (data.password !== data.cpassword) {
            setErrorMessage("Password and Confirm Password Doesn't Matched")
            setShow(true)
        }
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ ...user, password: data.password })
            })
            response = await response.json()
            setUser({ ...user, password: data.password })
            toast("Your Password Has Been Updated!!!");
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
                setUser({ ...response.data })
        })()
    }, [])
    return (
        <>

            <div className="row align-items-center">
                <div className="col-lg-6">
                    {show && errorMessage ? <p className='text-danger text-center'>{errorMessage}</p> : null}
                    <div className="form-section">
                        <form onSubmit={postData}>
                            <div className="password mb-3">
                                <label htmlFor="pass" className="form-label">Password*</label>
                                <input type="password" name='password' onChange={getInputData} className={`form-control ${show && errorMessage ? 'border-danger' : 'myborder'}`} id="pass"
                                    placeholder="******" />
                            </div>
                            <div className="re-password mb-3">
                                <label htmlFor="repass" className="form-label">Re-enter Password*</label>
                                <input type="password" name='cpassword' onChange={getInputData} className={`form-control ${show && errorMessage ? 'border-danger' : 'myborder'}`} id="repass"
                                    placeholder="******" />
                            </div>
                            <div className="form-btn">
                                <button type='submit' className="shop-btn w-100">Upldate Password</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="reset-img text-end">
                        <img src="/images/lock.webp" alt="reset" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
