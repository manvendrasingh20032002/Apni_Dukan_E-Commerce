import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword3Page() {
    let [password, setPassword] = useState("")
    let [cpassword, setCPassword] = useState("")
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        if (e.target.name === "password")
            setPassword(e.target.value)
        else
            setCPassword(e.target.value)
    }

    async function postData(e) {
        e.preventDefault()
        if (password !== cpassword) {
            setErrorMessage("Password and Confirm Password Doesn't Matched")
            return
        }
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-3`, {
            method: "POST",
            headers: {
                "content-type": "Application/json",
                "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
            },
            body: JSON.stringify({
                username: sessionStorage.getItem("forget-password-username"),
                password: password
            })
        })
        response = await response.json()

        if (response.result === "Done") {
            sessionStorage.removeItem("forget-password-username")
            navigate("/login")
        }
        else
            setErrorMessage(response.reason)
    }
    return (
        <>
            <section className="login  footer-padding">
                <div className="container p-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-10 m-auto bg-light p-5 rounded my-5" style={{ marginTop: "100px !important" }}>
                            <h5 className="text-center mb-3">Recover Your Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='Enter New Password' />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Confirm Password*</label>
                                        <input type="password" name="cpassword" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='Confirm Password' />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
