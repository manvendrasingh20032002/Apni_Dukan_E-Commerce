import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({ title }) {
    return (
        <section className="blog about-blog">
            <div className="container">
                <div className="blog-bradcrum">
                    <span><Link to="/">Home</Link></span>
                    <span className="devider">/</span>
                    <span><a href="#">{title}</a></span>
                </div>
                <div className="blog-heading about-heading">
                    <h1 className="heading">{title}</h1>
                </div>
            </div>
        </section>
    )
}
