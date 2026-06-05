import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { Link } from 'react-router-dom'
export default function Maincategory() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    return (
        <section className="product-category my-5">
            <div className="container">
                <div className="my-3">
                    <h5 className='text-center'>Our Main Categories</h5>
                </div>
                <div className="category-section">
                    {
                        MaincategoryStateData.map(item => {
                            return <div key={item._id} className="product-wrapper" data-aos="fade-right" data-aos-duration="100">
                                <div className="wrapper-img">
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} className='h-100 w-100' alt="dress" />
                                </div>
                                <div className="wrapper-info">
                                    <Link to={`/shop?mc=${item.name}`} className="wrapper-details">{item.name}</Link>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
