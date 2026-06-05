import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Footer() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    logoBottom: import.meta.env.VITE_APP_LOGO_BOTTOM,
    map1: import.meta.env.VITE_APP_MAP1,
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
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  function postData(e) {
    e.preventDefault()
    if (email === "" || email.length < 13)
      setMessage("Please Enter a Valid Email Address")
    else {
      dispatch(createNewsletter({ email: email, status: true }))
      setMessage("Thanks to Subscribe Our Newsletter Service")
      setEmail("")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let data = SettingStateData[0]
        setSettingData({
          siteName: data.siteName ? data.siteName : settingData.siteName,
          logoBottom: data.logoBottom ? import.meta.env.VITE_APP_IMAGE_SERVER + data.logoBottom : settingData.logoBottom,
          map1: data.map1 ? data.map1 : settingData.map1,
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
      <section className="product footer">
        <div className="container">
          <div className="footer-service-section">
            <div className="row gy-4">
              <div className="col-lg-3  col-sm-6">
                <div className="service-wrapper free-shipping">
                  <div className="service-img">
                    <i className='bi bi-cart text-light' style={{ fontSize: 40 }}></i>
                  </div>
                  <div className="service-content">
                    <h5 className="service-info service-title">Free Shipping</h5>
                    <p className="service-info service-details">When ordering over &#8377;1000</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="service-wrapper free-shipping">
                  <div className="service-img">
                    <i className='bi bi-arrow-clockwise text-light' style={{ fontSize: 40 }}></i>
                  </div>
                  <div className="service-content">
                    <h5 className="service-info service-title">Free Return</h5>
                    <p className="service-info service-details">Get Return within 7 days</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="service-wrapper free-shipping">
                  <div className="service-img">
                    <i className='bi bi-shield-lock text-light' style={{ fontSize: 40 }}></i>
                  </div>
                  <div className="service-content">
                    <h5 className="service-info service-title">Secure Payment</h5>
                    <p className="service-info service-details">100% Secure Online Payment</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="service-wrapper free-shipping">
                  <div className="service-img">
                    <i className='bi bi-trophy text-light' style={{ fontSize: 40 }}></i>
                  </div>
                  <div className="service-content">
                    <h5 className="service-info service-title">Best Quality</h5>
                    <p className="service-info service-details">Original Product Guarenteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <div className="row gy-5">
              <div className="col-lg-3 col-sm-6">
                <div className="footer-order">
                  <div className="logo">
                    <img src={`${settingData.logoBottom}`} style={{ height: 130 }} alt="logo" />
                  </div>
                  <div className="contact-info">
                    <div className="footer-link contact-link">
                      <div className="address">
                        <div className="icon mt-3">
                          <i className='border border-light p-3 rounded-circle bi bi-geo-alt fs-2 me-2 text-light'></i>
                        </div>
                        <div className="details">
                          <h4 className="footer-heading">Address:</h4>
                          <Link to={settingData.map1} target='_blank' rel='noreferrer'>{settingData.address}</Link>
                        </div>
                      </div>
                      <div className="address">
                        <div className="icon mt-3">
                          <i className='border border-light p-3 rounded-circle bi bi-envelope fs-2 me-2 text-light'></i>
                        </div>
                        <div className="details">
                          <h4 className="footer-heading">Email:</h4>
                          <Link to={`mailto:${settingData.email}`} target='_blank' rel='noreferrer'>{settingData.email}</Link>
                        </div>
                      </div>
                      <div className="address">
                        <div className="icon mt-3">
                          <i className='border border-light p-3 rounded-circle bi bi-phone fs-2 me-2 text-light'></i>
                        </div>
                        <div className="details">
                          <h4 className="footer-heading">Phone:</h4>
                          <Link to={`tel:${settingData.phone}`} target='_blank' rel='noreferrer'>{settingData.phone}</Link>
                        </div>
                      </div>
                      <div className="address">
                        <div className="icon mt-3">
                          <i className='border border-light p-3 rounded-circle bi bi-whatsapp fs-2 me-2 text-light'></i>
                        </div>
                        <div className="details">
                          <h4 className="footer-heading">Whatsapp:</h4>
                          <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' rel='noreferrer'>{settingData.whatsapp}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="about-us">
                  <h4 className="footer-heading footer-title">
                    Quick Links
                  </h4>
                  <div className="footer-link about-link">
                    <ul>
                      <li><Link to="/"><i className='bi bi-caret-right fs-3'></i> Home</Link></li>
                      <li><Link to="/about"><i className='bi bi-caret-right fs-3'></i> About</Link></li>
                      <li><Link to="/shop"><i className='bi bi-caret-right fs-3'></i> Shop</Link></li>
                      <li><Link to="/features"><i className='bi bi-caret-right fs-3'></i> Features</Link></li>
                      <li><Link to="/testimonials"><i className='bi bi-caret-right fs-3'></i> Testimonials</Link></li>
                      <li><Link to="/faq"><i className='bi bi-caret-right fs-3'></i> Faq</Link></li>
                      <li><Link to="/contactus"><i className='bi bi-caret-right fs-3'></i> Contact Us</Link></li>
                      <li><Link to="/privacy-policy"><i className='bi bi-caret-right fs-3'></i> Privacy Policy</Link></li>
                      <li><Link to="/terms-conditions"><i className='bi bi-caret-right fs-3'></i> Terms And Conditions</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <h4 className="footer-heading footer-title">
                  Newsletter
                </h4>
                <div className='my-5'>
                  <p className='text-light pb-3 mb-3'>{settingData.siteName} is your trusted online marketplace offering quality products at honest prices. We bring you the latest fashion, reliable electronics, stylish home essentials, and daily-use items—all in one place. Our mission is to deliver convenience, value, and a seamless shopping experience to every customer across India.</p>
                  <p className='text-light'>Stay updated with the latest deals, new arrivals, and exclusive offers from Apni Dukan. Subscribe to our newsletter and never miss out on discounts and trending products. Shop smarter and stay connected with everything we bring to your doorstep!</p>
                  <form onSubmit={postData} className='my-5'>
                    <div className="btn-group w-100">
                      <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Your Email Address to Subscribe Our Newsletter Service' className='form-control p-3 fs-3' />
                      <button className='btn btn-primary mybackground' style={{ width: 100 }}><i className='bi bi-send fs-2 mt-2'></i></button>
                    </div>
                  </form>
                  {message ? <p className='text-light mt-2'>{message}</p> : null}
                </div>
                <div className="header-contact">
                  <Link to={settingData.facebook} target='_blank' rel='noreferrer'><span className="text-light me-5"><i className='border border-light p-3 rounded-circle bi bi-facebook fs-2'></i></span></Link>
                  <Link to={settingData.twitter} target='_blank' rel='noreferrer'><span className="text-light me-5"><i className='border border-light p-3 rounded-circle bi bi-twitter fs-2'></i></span></Link>
                  <Link to={settingData.linkedin} target='_blank' rel='noreferrer'><span className="text-light me-5"><i className='border border-light p-3 rounded-circle bi bi-linkedin fs-2'></i></span></Link>
                  <Link to={settingData.instagram} target='_blank' rel='noreferrer'><span className="text-light me-5"><i className='border border-light p-3 rounded-circle bi bi-instagram fs-2'></i></span></Link>
                  <Link to={settingData.youtube} target='_blank' rel='noreferrer'><span className="text-light me-5"><i className='border border-light p-3 rounded-circle bi bi-youtube fs-2'></i></span></Link>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className='text-center'>copyright@apnidukan.com</p>
        </div>
      </section>
    </>
  )
}
