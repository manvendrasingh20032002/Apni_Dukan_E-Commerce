import React, { useEffect } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function Error404Page() {
    let navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("login")) {
                if (localStorage.getItem("role") === "Buyer" && window.location.pathname === "/profile")
                    navigate(0)
                else if (window.location.pathname === "/admin" && localStorage.getItem("role") !== "Buyer")
                    navigate(0)
            }
        }, 500)
    }, [])
    return (
        <>
            <Breadcrum title="Page Not Found" />
            <section className="footer-padding">
                <div className="container">
                    <div className="blog-item">
                        <div className="error-img">
                            <img src="/images/404.jpg" height={300} alt="404-error" />
                        </div>
                        <Link to="/" className='shop-btn'>Back to Home</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
