import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { Link } from 'react-router-dom'
export default function Subcategory() {
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    return (
        <section className="product-category my-5">
            <div className="container">
                <div className="my-3">
                    <h5 className='text-center'>Our Sub Categories</h5>
                </div>
                <div className="category-section">
                    {
                        SubcategoryStateData.map(item => {
                            return <div key={item._id} className="product-wrapper" data-aos="fade-right" data-aos-duration="100">
                                <div className="wrapper-img">
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} className='h-100 w-100' alt="dress" />
                                </div>
                                <div className="wrapper-info">
                                    <Link to={`/shop?sc=${item.name}`} className="wrapper-details">{item.name}</Link>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
