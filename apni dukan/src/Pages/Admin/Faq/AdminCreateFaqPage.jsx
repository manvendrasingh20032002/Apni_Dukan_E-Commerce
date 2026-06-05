import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getFaq, createFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
export default function AdminCreateFaqPage() {
    let [data, setData] = useState({
        question: "",
        answer: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        question: "Question Field is Mendatory",
        answer: "Answer Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let FaqStateData = useSelector(state => state.FaqStateData)
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
            let item = FaqStateData.find(x => x.question.toLocaleLowerCase() === data.question.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Faq Record With This Question Already Exist" })
                setShow(true)
                return
            }
            dispatch(createFaq({ ...data }))
            navigate("/admin/faq")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())
        })()
    }, [FaqStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Create Faq
                            <Link to="/admin/faq"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
                        </h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-5">
                                    <label>Question*</label>
                                    <input type="text" name="question" onChange={getInputData} placeholder='Question' className={`form-control ${show && errorMessage.question ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : null}
                                </div>
                                <div className="col-12 mb-5">
                                    <label>Answer*</label>
                                    <textarea name="answer" placeholder='Answer...' rows={3} onChange={getInputData} className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'myborder'}`} ></textarea>
                                    {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : null}
                                </div>
                                <div className="col-md-6 mb-5">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select myborder'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-5">
                                    <button className='btn btn-primary btn-lg w-100 mybackground p-3'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
