import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: "",
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/login`, {
            method: "POST",
            headers: {
                "content-type": "Application/json",
                "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
            },
            body: JSON.stringify({ ...data })
        })
        response = await response.json()

        if (response.result === "Done" && response.data.status === false) {
            setErrorMessage("Your Account Has Been Blocked Due to Some Unauthorized Activity, Please Contact Us to Un block Your Account")
        }
        else if (response.result === "Done") {
            localStorage.setItem("login", true)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("userid", response.data._id)
            localStorage.setItem("token", response.token)
            localStorage.setItem("role", response.data.role)
            if (response.data.role === "Buyer")
                navigate("/profile")
            else
                navigate("/admin")
        }
        else
            setErrorMessage("Invalid Username or Password")
    }
    return (
        <>
            <section className="login  footer-padding">
                <div className="container p-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-10 m-auto bg-light p-5 rounded my-5" style={{ marginTop: "100px !important" }}>
                            <h5 className="text-center mb-3">Login To Your Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='User Name or Email Address' />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50 border-0">Login</button>
                                </div>
                            </form>
                            <div className='d-flex justify-content-between'>
                                <span className="shop-account">Forget Password ?<Link to="/forget-password-1">Reset</Link></span>
                                <span className="shop-account">Doesn't have an account ?<Link to="/signup">Create</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
