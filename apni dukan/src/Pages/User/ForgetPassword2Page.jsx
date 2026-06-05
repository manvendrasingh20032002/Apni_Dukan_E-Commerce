import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword2Page() {
    let [otp, setOtp] = useState("")
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        setOtp(e.target.value)
    }

    async function postData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-2`, {
            method: "POST",
            headers: {
                "content-type": "Application/json",
                "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
            },
            body: JSON.stringify({ username: sessionStorage.getItem("forget-password-username"), otp: otp })
        })
        response = await response.json()

        if (response.result === "Done") {
            navigate("/forget-password-3")
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
                                        <label>OTP*</label>
                                        <input type="text" name="otp" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='Enter OTP Which is Sent On Your Registered Email Address' />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Submit OTP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
