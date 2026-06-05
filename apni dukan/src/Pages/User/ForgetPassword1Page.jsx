import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword1Page() {
    let [username, setUsername] = useState("")
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        setUsername(e.target.value)
    }

    async function postData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/forget-password-1`, {
            method: "POST",
            headers: {
                "content-type": "Application/json",
                "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
            },
            body: JSON.stringify({ username: username })
        })
        response = await response.json()

        if (response.result === "Done") {
            sessionStorage.setItem("forget-password-username", username)
            navigate("/forget-password-2")
        }
        else
            setErrorMessage("User Not Found! Please Provide Correct Username or Email Address")
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
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='User Name or Email Address' />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Send OTP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
