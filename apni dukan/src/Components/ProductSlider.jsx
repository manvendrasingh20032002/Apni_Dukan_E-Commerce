import React from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import SingleProduct from './SingleProduct';

export default function ProductSlider({ maincategory, products }) {
    let sliderOptions = {
        speed: 600,
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: false,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4
            }
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [Autoplay]
    }
    return (
        <>
            <section className="product arrival">
                <div className="container">
                    <div className="section-title">
                        <h5>{maincategory === "Related Products" ? `${maincategory}` : `NEW ARRIVALS for ${maincategory}`}</h5>
                        <Link to={`/shop?mc=${maincategory}`} className="view">View All</Link>
                    </div>
                    <div className="arrival-section">
                        <div className="">
                            <Swiper className="mySwiper" {...sliderOptions}>
                                {
                                    products.map(item => {
                                        return <SwiperSlide key={item._id} >
                                            <div className="">
                                                <SingleProduct item={item} />
                                            </div>
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
