import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { Link } from 'react-router-dom'
export default function Brand() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    return (
        <section className="product-category my-5">
            <div className="container">
                <div className="my-3">
                    <h5 className='text-center'>Our Top Brands</h5>
                </div>
                <div className="category-section">
                    {
                        BrandStateData.map(item => {
                            return <div key={item._id} className="product-wrapper" data-aos="fade-right" data-aos-duration="100">
                                <div className="wrapper-img">
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} style={{ height: 120 }} className='w-100' alt="dress" />
                                </div>
                                <div className="wrapper-info">
                                    <Link to={`/shop?br=${item.name}`} className="wrapper-details">{item.name}</Link>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
