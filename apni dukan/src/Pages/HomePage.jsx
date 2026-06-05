import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Maincategory from "../Components/Maincategory"
import Subcategory from '../Components/Subcategory';
import Brand from "../Components/Brand"

import ProductSlider from '../Components/ProductSlider'
import Products from '../Components/Products'
import About from '../Components/About'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
export default function HomePage() {
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()


  let sliderOptions = {
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
    loop: true,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay]
  }


  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])
  useEffect(() => {
    (() => dispatch(getProduct()))()
  }, [ProductStateData.length])

  return (
    <>
      <section id="hero">
        <div className="hero-swiper" style={{ position: "relative", zIndex: -1 }}>
          <Swiper className="mySwiper" {...sliderOptions}>
            <SwiperSlide className='hero-wrapper'>
              <div className="hero-slide hero-slider-one" style={{ height: 550 }}>
                <div className="container">
                  <div className="col-lg-6">
                    <div className="wrapper-section">
                      <div className="wrapper-info">
                        <h5 className="wrapper-subtitle text-light">UP TO <span className="wrapper-inner-title">90%</span> OFF
                        </h5>
                        <h4 className="wrapper-details text-light">Upgrade your style with premium men’s fashion—trendsetting outfits designed for comfort, confidence, and everyday wear.</h4>
                        <Link to="/shop?mc=Male" className="shop-btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='hero-wrapper'>
              <div className="hero-slide hero-slider-two" style={{ height: 550 }}>
                <div className="container">
                  <div className="col-lg-6">
                    <div className="wrapper-section">
                      <div className="wrapper-info">
                        <h5 className="wrapper-subtitle text-light">UP TO <span className="wrapper-inner-title">90%</span> OFF
                        </h5>
                        <h4 className="wrapper-details text-light">Discover the latest women’s clothing—bold styles, perfect fits, and unmatched comfort for every modern wardrobe.</h4>
                        <Link to="/shop?mc=Female" className="shop-btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='hero-wrapper'>
              <div className="hero-slide hero-slider-three" style={{ height: 550 }}>
                <div className="container">
                  <div className="col-lg-6">
                    <div className="wrapper-section">
                      <div className="wrapper-info">
                        <h5 className="wrapper-subtitle text-light">UP TO <span className="wrapper-inner-title">90%</span> OFF
                        </h5>
                        <h4 className="wrapper-details text-light">Shop premium kids’s fashion with stylish fits, top brands, and everyday essentials crafted for your kids lifestyle.</h4>
                        <Link to="/shop?mc=Kids" className="shop-btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='hero-wrapper'>
              <div className="hero-slide hero-slider-four" style={{ height: 550 }}>
                <div className="container">
                  <div className="col-lg-6">
                    <div className="wrapper-section">
                      <div className="wrapper-info">
                        <h5 className="wrapper-subtitle text-light">UP TO <span className="wrapper-inner-title">90%</span> OFF
                        </h5>
                        <h4 className="wrapper-details text-light">Transform your home with stylish, durable furniture designed for comfort, elegance, and everyday modern living.</h4>
                        <Link to="/shop?mc=Furniture" className="shop-btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='hero-wrapper'>
              <div className="hero-slide hero-slider-five" style={{ height: 550 }}>
                <div className="container">
                  <div className="col-lg-6">
                    <div className="wrapper-section">
                      <div className="wrapper-info">
                        <h5 className="wrapper-subtitle text-light">UP TO <span className="wrapper-inner-title">70%</span> OFF
                        </h5>
                        <h4 className="wrapper-details text-light">Explore cutting-edge electronics with top performance, smart features, and unbeatable quality for your modern lifestyle.</h4>
                        <Link to="/shop?mc=Electronics" className="shop-btn">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>
      <section className="product fashion-style">
        <div className="container">
          <div className="style-section">
            <div className="row gy-4 gx-5 gy-lg-0">
              {
                ProductStateData?.filter(x => x.status)?.slice(0, 4)?.map(item => {
                  return <div className="col-lg-6" key={item._id}>
                    <div className="product-wrapper wrapper-one" data-aos="fade-right">
                      <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} className='h-100 w-100' style={{ objectFit: "cover" }} alt="" />
                      <div className="wrapper-info position-absolute" style={{ top: "30%", left: 40 }}>
                        <span className="wrapper-subtitle fs-1" style={{ fontWeight: "bold" }}>{item.brand.name}</span>
                        <h4 className="wrapper-details fs-3">Get {item.discount}% Offer</h4>
                        <h4 className="wrapper-details">{item.name}
                          <span className="wrapper-inner-title"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice}</span>
                        </h4>
                        <Link to={`/product/${item._id}`} className="shop-btn">Shop Now <i className='bi bi-caret-right fs-4'></i></Link>
                      </div>
                    </div>
                  </div>

                })
              }
            </div>
          </div>
        </div>
      </section>
      <Maincategory />
      <Subcategory />
      <Brand />

      <About />
      <Products maincategory={MaincategoryStateData} products={ProductStateData} />

      {
        MaincategoryStateData?.filter(x => x.status).map(item => {
          return ProductStateData.filter(x => x.maincategory?.name === item.name).length?<ProductSlider key={item._id} maincategory={item.name} products={ProductStateData.filter(x => x.maincategory?.name === item.name)} />:null
        })
      }
    </>
  )
}
