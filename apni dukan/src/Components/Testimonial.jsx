import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
import { Link } from 'react-router-dom';
export default function Testimonial({ pid }) {
    let [data, setData] = useState([])
    let [reviewStats, setReviewStats] = useState({
        total: 0,
        rating: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0
    })
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let sliderOptions = {
        speed: 600,
        spaceBetween: 0,
        navigation: false,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        },
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [Pagination, Autoplay]
    }

    function getStar(star) {
        if (star === 5)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i></>
        else if (star === 4)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i></>
        else if (star === 3)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
        else if (star === 2)
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
        else
            return <><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></>
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                if (pid) {
                    let data = TestimonialStateData.filter(x => x.product?._id === pid)
                    setData(data)
                    let count = 0
                    let five = 0
                    let four = 0
                    let three = 0
                    let two = 0
                    let one = 0
                    data.forEach(x => {
                        count += x.star
                        if (x.star == 5)
                            five++
                        else if (x.star == 4)
                            four++
                        else if (x.star == 3)
                            three++
                        else if (x.star == 2)
                            two++
                        else
                            one++
                    })
                    setReviewStats({
                        total: data.length,
                        rating: (count / data.length).toFixed(1),
                        fiveStar: five,
                        fourStar: four,
                        threeStar: three,
                        twoStar: two,
                        oneStar: one
                    })
                }
                else
                    setData(TestimonialStateData.filter(x => x.star >= 4))
            }
        })()
    }, [TestimonialStateData.length, pid])
    return (
        <section className="about-feedback product" style={{ marginTop: -200 }}>
            <div className="container p-0">
                <div className="position-relative p-5" style={{ margin: "100px" }}>
                    {
                        pid ?
                            <>
                                <div className="row my-5">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-5">
                                                <div className="card p-4">
                                                    <h6>Customers Reviews</h6>
                                                    <h5>{reviewStats.rating}<i className='ms-2 bi bi-star-fill text-warning fs-4'></i></h5>
                                                    <h6>{reviewStats.total} Verified Buyers</h6>
                                                </div>
                                            </div>
                                            <div className="col-7 card p-4">
                                                <div className='row'>
                                                    <p className="col-5 mb-0">5 <i className="bi bi-star-fill text-warning"></i> ({reviewStats.fiveStar})</p>
                                                    <div className='col-7'>
                                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={reviewStats.fiveStar * 100 / reviewStats.total} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${reviewStats.fiveStar * 100 / reviewStats.total}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p className="col-5 mb-0">4 <i className="bi bi-star-fill text-warning"></i> ({reviewStats.fourStar})</p>
                                                    <div className='col-7'>
                                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={reviewStats.fourStar * 100 / reviewStats.total} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${reviewStats.fourStar * 100 / reviewStats.total}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p className="col-5 mb-0">3 <i className="bi bi-star-fill text-warning"></i> ({reviewStats.threeStar})</p>
                                                    <div className='col-7'>
                                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={reviewStats.threeStar * 100 / reviewStats.total} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${reviewStats.threeStar * 100 / reviewStats.total}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p className="col-5 mb-0">2 <i className="bi bi-star-fill text-warning"></i> ({reviewStats.twoStar})</p>
                                                    <div className='col-7'>
                                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={reviewStats.twoStar * 100 / reviewStats.total} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${reviewStats.twoStar * 100 / reviewStats.total}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p className="col-5 mb-0">1 <i className="bi bi-star-fill text-warning"></i> ({reviewStats.oneStar})</p>
                                                    <div className='col-7'>
                                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={reviewStats.oneStar * 100 / reviewStats.total} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${reviewStats.oneStar * 100 / reviewStats.total}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : null
                    }
                    <Swiper className="mySwiper" {...sliderOptions}>
                        {
                            data.map(item => {
                                return <SwiperSlide key={item._id}>
                                    <div className="swiper-slide testimonial-wrapper">
                                        <div className="testimonial-info-details">
                                            <Link to={`/product/${item.product?._id}`} className="testimonial-name fs-3 text-center mb-3">{item.product?.name}( {getStar(item.star)})</Link>
                                        </div>
                                        <p className="testimonial-details">{item.message}</p>
                                        <div className="divider"></div>
                                        <div className="testimonial-info">
                                            <div className="testimonial-info-details">
                                                <h5 className="testimonial-name">{item.user?.name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                    <div className="swiper-pagination"></div>
                </div>
            </div>

        </section>
    )
}
