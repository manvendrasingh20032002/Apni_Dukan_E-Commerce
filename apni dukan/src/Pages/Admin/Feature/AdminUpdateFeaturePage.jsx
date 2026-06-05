import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import FormValidators from '../../../Validators/FormValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getFeature, updateFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
export default function AdminUpdateFeaturePage() {
    let { _id } = useParams()
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let FeatureStateData = useSelector(state => state.FeatureStateData)
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
            let item = FeatureStateData.find(x => x._id !== _id && (x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()))
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Feature With This Name Already Exist" })
                setShow(true)
                return
            }
            dispatch(updateFeature({ ...data }))
            navigate("/admin/feature")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
            if (FeatureStateData.length) {
                let item = FeatureStateData.find(x => x._id === _id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/feature")
            }
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Update Feature
                            <Link to="/admin/feature"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
                        </h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-5">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Feature Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-12 mb-5">
                                    <label>Short Description*</label>
                                    <textarea name="shortDescription" placeholder='Short Description...' value={data.shortDescription} rows={3} onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'myborder'}`} ></textarea>
                                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                </div>
                                <div className="col-md-6 mb-5">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" onChange={getInputData} value={data.icon} placeholder="Icon Tag eg. <i className='bi bi-list'></i>" className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>
                                <div className="col-md-6 mb-5">
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select myborder'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-5">
                                    <button className='btn btn-primary btn-lg w-100 mybackground p-3'>Update</button>
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
