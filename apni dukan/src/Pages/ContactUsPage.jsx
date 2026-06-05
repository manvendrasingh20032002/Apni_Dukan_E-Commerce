import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'
import ContactUsForm from '../Components/ContactUsForm'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { Link } from 'react-router-dom'
export default function ContactUsPage() {
    let [settingData, setSettingData] = useState({
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
        address: import.meta.env.VITE_APP_ADDRESS,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE
    })

    let SettingStateData = useSelector(state => state.SettingStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let data = SettingStateData[0]
                setSettingData({
                    map1: data.map1 ? data.map1 : settingData.map1,
                    map2: data.map2 ? data.map2 : settingData.map2,
                    address: data.address ? data.address : settingData.address,
                    email: data.email ? data.email : settingData.email,
                    phone: data.phone ? data.phone : settingData.phone,
                    whatsapp: data.whatsapp ? data.whatsapp : settingData.whatsapp,
                    facebook: data.facebook ? data.facebook : settingData.facebook,
                    twitter: data.twitter ? data.twitter : settingData.twitter,
                    linkedin: data.linkedin ? data.linkedin : settingData.linkedin,
                    instagram: data.instagram ? data.instagram : settingData.instagram,
                    youtube: data.youtube ? data.youtube : settingData.youtube,
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title="Contact Us" />
            <section className="contact product footer-padding">
                <div className="container">
                    <div className="contact-section">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="contact-info-section">
                                    <div className="contact-information">
                                        <h5 className="comment-title text-center">Contact Information</h5>
                                        <div className="contact-wrapper">
                                            <div className="row gy-5">
                                                <div className="col-sm-6">
                                                    <div className="wrapper phone">
                                                        <div className="wrapper-img">
                                                            <i className='bi bi-telephone-inbound fs-1 myTextColor'></i>
                                                        </div>
                                                        <div className="wrapper-content">
                                                            <h5 className="wrapper-heading">Phone</h5>
                                                            <Link className="paragraph myTextColor" target='_blank' rel='noreferrer' to={`tel:${settingData.phone}`}>{settingData.phone}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapper phone">
                                                        <div className="wrapper-img">
                                                            <i className='bi bi-whatsapp fs-1 myTextColor'></i>
                                                        </div>
                                                        <div className="wrapper-content">
                                                            <h5 className="wrapper-heading">Whatsapp</h5>
                                                            <Link className="paragraph myTextColor" target='_blank' rel='noreferrer' to={`https://wa.me/:${settingData.whatsapp}`}>{settingData.whatsapp}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapper phone">
                                                        <div className="wrapper-img">
                                                            <i className='bi bi-envelope fs-1 myTextColor'></i>
                                                        </div>
                                                        <div className="wrapper-content">
                                                            <h5 className="wrapper-heading">Email</h5>
                                                            <Link className="paragraph myTextColor" target='_blank' rel='noreferrer' to={`mailto:${settingData.email}`}>{settingData.email}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapper phone">
                                                        <div className="wrapper-img">
                                                            <i className='bi bi-facebook fs-1 myTextColor'></i>
                                                        </div>
                                                        <div className="wrapper-content">
                                                            <h5 className="wrapper-heading">Social Media Links</h5>
                                                            <Link className="paragraph myTextColor me-3" target='_blank' rel='noreferrer' to={`${settingData.facebook}`}><i className='bi bi-facebook'></i></Link>
                                                            <Link className="paragraph myTextColor me-3" target='_blank' rel='noreferrer' to={`${settingData.twitter}`}><i className='bi bi-twitter'></i></Link>
                                                            <Link className="paragraph myTextColor me-3" target='_blank' rel='noreferrer' to={`${settingData.linkedin}`}><i className='bi bi-linkedin'></i></Link>
                                                            <Link className="paragraph myTextColor me-3" target='_blank' rel='noreferrer' to={`${settingData.instagram}`}><i className='bi bi-instagram'></i></Link>
                                                            <Link className="paragraph myTextColor me-3" target='_blank' rel='noreferrer' to={`${settingData.youtube}`}><i className='bi bi-youtube'></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="address">
                                                        <div className="contact-address">
                                                            <div className="address-icon">
                                                                <i className='bi bi-geo-alt fs-1 myTextColor'></i>
                                                            </div>
                                                            <div className="address-content">
                                                                <h5 className="wrapper-heading">Address</h5>
                                                                <Link className="paragraph myTextColor" target='_blank' rel='noreferrer' to={`${settingData.map1}`}>{settingData.address}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <ContactUsForm />
                            </div>
                        </div>
                        <div className="contact-map">
                            <iframe
                                src={settingData.map2}
                                width="524" height="350" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
