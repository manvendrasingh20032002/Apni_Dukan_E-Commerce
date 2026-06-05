import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getSetting, createSetting } from "../../../Redux/ActionCreators/SettingActionCreators"

let rte1
let rte2
export default function AdminSettingPage() {
    let refdiv1 = useRef(null)
    let refdiv2 = useRef(null)

    let [data, setData] = useState({
        map1: "",
        map2: "",
        siteName: "",
        logoTop: "",
        logoBottom: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        youtube: ""
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        // let value = (name === "logoTop" || name === "logoBottom") ? "logo/" + e.target.files[0].name : e.target.value
        let value = (name === "logoTop" || name === "logoBottom") ? e.target.files[0] : e.target.value

        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()

        // if (SettingStateData.length) {
        //     dispatch(updateSetting({
        //         ...data,
        //         privacyPolicy: rte1.getHTMLCode(),
        //         termCondition: rte2.getHTMLCode()
        //     }))
        // }
        // else {
        //     dispatch(createSetting({
        //         ...data,
        //         privacyPolicy: rte1.getHTMLCode(),
        //         termCondition: rte2.getHTMLCode()
        //     }))
        // }
        let formData = new FormData()
        formData.append("map1", data.map1)
        formData.append("map2", data.map2)
        formData.append("address", data.address)
        formData.append("siteName", data.siteName)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("whatsapp", data.whatsapp)
        formData.append("logoTop", data.logoTop)
        formData.append("logoBottom", data.logoBottom)
        formData.append("privacyPolicy", rte1.getHTMLCode())
        formData.append("termCondition", rte2.getHTMLCode())
        formData.append("facebook", data.facebook)
        formData.append("twitter", data.twitter)
        formData.append("linkedin", data.linkedin)
        formData.append("instagram", data.instagram)
        formData.append("youtube", data.youtube)
        dispatch(createSetting(formData))

        toast("Website Setting Data Has Been Updated!!!");
    }

    useEffect(() => {
        dispatch(getSetting())
        rte1 = new window.RichTextEditor(refdiv1.current);
        rte2 = new window.RichTextEditor(refdiv2.current);
        if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })
            rte1.setHTMLCode(SettingStateData[0].privacyPolicy)
            rte2.setHTMLCode(SettingStateData[0].termCondition)
        }
        else {
            rte1.setHTMLCode("")
            rte2.setHTMLCode("")
        }
    }, [SettingStateData.length])
    return (
        <>
            <ToastContainer />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Website Setting</h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Map1</label>
                                    <input type="text" name="map1" value={data.map1} onChange={getInputData} placeholder='Google Map1' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Map2</label>
                                    <input type="text" name="map2" value={data.map2} onChange={getInputData} placeholder='Google Map2' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} placeholder='Site Name' className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Logo Top</label>
                                    <input type="file" name="logoTop" onChange={getInputData} className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Logo Bottom</label>
                                    <input type="file" name="logoBottom" onChange={getInputData} className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control border-dark' />
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Whatsapp Number</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} placeholder='Whatsapp Number' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Privacy Policy</label>
                                    <div className='border-dark' ref={refdiv1}></div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Terms & Conditions</label>
                                    <div className='border-dark' ref={refdiv2}></div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Facebook Profile Page URL</label>
                                    <input type="url" name="facebook" value={data.facebook} onChange={getInputData} placeholder='Facebook Profile Page URL' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Twitter Profile Page URL</label>
                                    <input type="url" name="twitter" value={data.twitter} onChange={getInputData} placeholder='Twitter Profile Page URL' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Linkedin Profile Page URL</label>
                                    <input type="url" name="linkedin" value={data.linkedin} onChange={getInputData} placeholder='Linkedin Profile Page URL' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Instagram Profile Page URL</label>
                                    <input type="url" name="instagram" value={data.instagram} onChange={getInputData} placeholder='Instagram Profile Page URL' className='form-control border-dark' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Youtube Profile Page URL</label>
                                    <input type="url" name="youtube" value={data.youtube} onChange={getInputData} placeholder='Youtube Profile Page URL' className='form-control border-dark' />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className='btn btn-primary w-100 btn-lg mybackground'>Submit</button>
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
