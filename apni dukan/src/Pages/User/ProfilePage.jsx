import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
// import Dashboard from '../../Components/User/Dashboard'
import Profile from '../../Components/User/Profile'
import UpdateProfile from '../../Components/User/UpdateProfile'
import Orders from '../../Components/User/Orders'
import Wishlist from '../../Components/User/Wishlist'
import Address from '../../Components/User/Address'
import Reviews from '../../Components/User/Reviews'
import ChangePassword from '../../Components/User/ChangePassword'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function ProfilePage() {
    let [searchParams, setSearchParams] = useSearchParams()
    let [option, setOption] = useState("profile")
    let navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        setOption(searchParams.get("option") ?? "profile")
    }, [searchParams])

    useEffect(() => {
        setSearchParams(prevParams => {
            prevParams.set("option", option);
            return prevParams;
        })
    }, [option])
    return (
        <>
            <Breadcrum title="Your Profile" />
            <section className="user-profile footer-padding">
                <div className="container">
                    <div className="user-profile-section">
                        <div className="user-dashboard">
                            <div className="nav nav-item nav-pills me-3" id="v-pills-tab" role="tablist"
                                aria-orientation="vertical">

                                {/* <button  className={`nav-link ${option === "dashboard" ? 'active' : ''}`} onClick={() => setOption('profile')}>
                                    <i className='bi bi-grid fs-1 text-dark'></i>
                                    <span className="text">Dashboard</span>
                                </button> */}
                                <button className={`nav-link ${option === "profile" ? 'active' : ''}`} onClick={() => setOption('profile')}>
                                    <i className='bi bi-person fs-1 text-dark'></i>
                                    <span className="text">
                                        Parsonal Info
                                    </span>
                                </button>

                                <button className={`nav-link ${option === "update-profile" ? 'active' : ''}`} onClick={() => setOption('update-profile')}>
                                    <i className='bi bi-pencil fs-1 text-dark'></i>
                                    <span className="text">
                                        Update Profile
                                    </span>
                                </button>

                                <button className={`nav-link  ${option === "orders" ? 'active' : ''}`} onClick={() => setOption('orders')}>
                                    <i className='bi bi-bag-check fs-1 text-dark'></i>
                                    <span className="text">
                                        Order
                                    </span>
                                </button>

                                <button className={`nav-link ${option === "wishlist" ? 'active' : ''}`} onClick={() => setOption('wishlist')}>
                                    <i className='bi bi-heart fs-1 text-dark'></i>
                                    <span className="text">
                                        Wishlist
                                    </span>
                                </button>

                                <button className={`nav-link ${option === "address" ? 'active' : ''}`} onClick={() => setOption('address')}>
                                    <i className='bi bi-geo-alt fs-1 text-dark'></i>
                                    <span className="text">
                                        Address
                                    </span>
                                </button>

                                <button className={`nav-link ${option === "reviews" ? 'active' : ''}`} onClick={() => setOption('reviews')}>
                                    <i className='bi bi-star fs-1 text-dark'></i>
                                    <span className="text">
                                        Reviews
                                    </span>
                                </button>


                                <button className={`nav-link ${option === "change-password" ? 'active' : ''}`} onClick={() => setOption('change-password')}>
                                    <i className='bi bi-lock fs-1 text-dark'></i>
                                    <span className="text">
                                        Change Password
                                    </span>
                                </button>

                                <div className="nav-link">
                                    <button onClick={logout}>
                                        <i className='bi bi-box-arrow-right fs-1 text-dark'></i>
                                        <span className="text ms-4">
                                            Logout
                                        </span>
                                    </button>
                                </div>

                            </div>

                            <div className="tab-content nav-content" id="v-pills-tabContent" style={{ flex: "1 0%" }}>

                                {/* <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                                    aria-labelledby="v-pills-home-tab" tabIndex="0">
                                    <Dashboard />
                                </div> */}

                                <div className={`tab-pane fade ${option === "profile" ? 'show active' : ''}`}>
                                    <Profile option={option} />
                                </div>

                                <div className={`tab-pane fade ${option === "update-profile" ? 'show active' : ''}`}>
                                    <UpdateProfile setOption={setOption} />
                                </div>

                                <div className={`tab-pane fade ${option === "orders" ? 'show active' : ''}`}>
                                    <Orders />
                                </div>

                                <div className={`tab-pane fade ${option === "wishlist" ? 'show active' : ''}`}>
                                    <Wishlist />
                                </div>

                                <div className={`tab-pane fade ${option === "address" ? 'show active' : ''}`}>
                                    <Address />
                                </div>

                                <div className={`tab-pane fade ${option === "reviews" ? 'show active' : ''}`}>
                                    <Reviews />
                                </div>

                                <div className={`tab-pane fade ${option === "change-password" ? 'show active' : ''}`}>
                                    <ChangePassword />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
