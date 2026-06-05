import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import FormValidators from '../Validators/FormValidators'

import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"

const dataOptions = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
}
const errorMessageOptions = {
    name: "Name Field is Mendatory",
    email: "Email Address Field is Mendatory",
    phone: "Phone Number Field is Mendatory",
    subject: "Subject Field is Mendatory",
    message: "Message Field is Mendatory"
}
export default function ContactUsForm() {
    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, date: new Date(), status: true }))
            setData(dataOptions)
            setErrorMessage(errorMessage)
            setShow(false)
            setMessage("Thank You! Your Query Has Been Submitted, Our Team Will Contact You Soon!!!")
        }
    }
    return (
        <div className="question-section login-section " data-aos="fade-left">
            <div className="">
                <h5 className="comment-title text-center">Have Any Question</h5>
                <p className="paragraph mb-3 text-center">Fill the form below or write us .We will help you as soon as possible.</p>
                {message ? <p className='text-center text-success fs-1'>{message}</p> : null}
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <label>Name*</label>
                            <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email*</label>
                            <input type="email" name="email" onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Phone*</label>
                            <input type="text" name="phone" onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                        </div>
                        <div className="col-12 mb-3">
                            <label>Subject*</label>
                            <input type="text" name="subject" onChange={getInputData} value={data.subject} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'myborder'}`} placeholder='Subject' />
                            {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                        </div>
                        <div className="col-12 mb-3">
                            <label>Message*</label>
                            <textarea name="message" onChange={getInputData} value={data.message} rows={7} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'myborder'}`} placeholder='Message...' ></textarea>
                            {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                        </div>
                        <div className="col-12 mb-3">
                            <button type="submit" className='shop-btn w-100'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
