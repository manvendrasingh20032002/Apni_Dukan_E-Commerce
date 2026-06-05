import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';


import Breadcrum from '../Components/Breadcrum'
import ProductSlider from '../Components/ProductSlider'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import Testimonial from '../Components/Testimonial';
export default function ProductPage() {
    let { _id } = useParams()
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let [selected, setSelected] = useState({
        qty: 1,
        color: "",
        size: ""
    })

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let sliderOptions = {
        speed: 600,
        grabCursor: true,
        effect: 'creative',
        loop: true,
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [EffectCreative, Autoplay]
    }

    function addToCart() {
        let item = CartStateData.find(x => x.user?._id === localStorage.getItem("userid") && x.product?._id === product._id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: product._id,
                qty: selected.qty,
                color: selected.color,
                size: selected.size,
                total: selected.qty * product.finalPrice,

                //Remove Below Lines in Case of Real Backend
                // name: product.name,
                // brand: product.brand,
                // stockQuantity: product.stockQuantity,
                // price: product.finalPrice,
                // pic: product.pic[0]
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user?._id === localStorage.getItem("userid") && x.product?._id === product._id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: product._id,

                //Remove Below Lines in Case of Real Backend
                // name: product.name,
                // brand: product.brand,
                // color: product.color,
                // size: product.size,
                // stockQuantity: product.stockQuantity,
                // price: product.finalPrice,
                // pic: product.pic[0]
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=wishlist")
    }

    function checkIsExist(collection) {
        if (collection === "Cart")
            return CartStateData.find(x => x.product?._id === product._id && x.user?._id === localStorage.getItem("userid")) ? true : false
        else
            return WishlistStateData.find(x => x.product?._id === product._id && x.user?._id === localStorage.getItem("userid")) ? true : false
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x._id === _id)
                if (item) {
                    setProduct(item)
                    setSelected({ ...selected, color: item.color[0], size: item.size[0] })
                    setRelatedProducts(ProductStateData.filter(x => x.status && x.maincategory?.name === item.maincategory?.name))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, _id])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])
    return (
        <>
            <Breadcrum title={product.name ?? "Product"} />

            <section className="product product-info" style={{ marginTop: -80 }}>
                <div className="container">
                    <div className="product-info-section">
                        <div className="row ">
                            <div className="col-md-6">
                                <Swiper {...sliderOptions} className="mySwiper">
                                    {
                                        product.pic?.map((item, index) => {
                                            return <SwiperSlide key={index}>
                                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} className='w-100' style={{ height: 500 }} alt="" />
                                            </SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className="col-md-6">
                                <div className="product-info-content" data-aos="fade-left">
                                    <span className="wrapper-subtitle">{product.maincategory?.name}/{product.subcategory?.name}/{product.brand?.name} Collection</span>
                                    <h5>{product.name}</h5>
                                    <div className="ratings">
                                        <span>
                                            <svg width="75" height="15" viewBox="0 0 75 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z"
                                                    fill="#FFA800" />
                                                <path
                                                    d="M22.5 0L24.1839 5.18237H29.6329L25.2245 8.38525L26.9084 13.5676L22.5 10.3647L18.0916 13.5676L19.7755 8.38525L15.3671 5.18237H20.8161L22.5 0Z"
                                                    fill="#FFA800" />
                                                <path
                                                    d="M37.5 0L39.1839 5.18237H44.6329L40.2245 8.38525L41.9084 13.5676L37.5 10.3647L33.0916 13.5676L34.7755 8.38525L30.3671 5.18237H35.8161L37.5 0Z"
                                                    fill="#FFA800" />
                                                <path
                                                    d="M52.5 0L54.1839 5.18237H59.6329L55.2245 8.38525L56.9084 13.5676L52.5 10.3647L48.0916 13.5676L49.7755 8.38525L45.3671 5.18237H50.8161L52.5 0Z"
                                                    fill="#FFA800" />
                                                <path
                                                    d="M67.5 0L69.1839 5.18237H74.6329L70.2245 8.38525L71.9084 13.5676L67.5 10.3647L63.0916 13.5676L64.7755 8.38525L60.3671 5.18237H65.8161L67.5 0Z"
                                                    fill="#FFA800" />
                                            </svg>
                                        </span>
                                        <span className="text">6 Reviews</span>
                                    </div>
                                    <div className="price">
                                        <span className="price-cut">&#8377;{product.basePrice}</span>
                                        <span className="new-price">&#8377;{product.finalPrice} <sup>{product.discount}% Off</sup></span>
                                    </div>
                                    <div className="product-availability d-block">
                                        <span>Availabillity : </span>
                                        <span className="inner-text">{product.stock ? `${product.stockQuantity} Left In Stock` : 'Out of Stock'}</span>
                                    </div>
                                    <div className='product-availability d-block'>
                                        <span>Color : </span>
                                        <div className="btn-group">
                                            {
                                                product.color?.map((item, index) => {
                                                    return <button key={index} className={`btn btn-light btn-lg mx-3 ${selected.color === item ? 'mybackground text-light' : ''}`} onClick={() => setSelected({ ...selected, color: item })}>{item}</button>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='product-availability d-block'>
                                        <span>Size : </span>
                                        <div className="btn-group">
                                            {
                                                product.size?.map((item, index) => {
                                                    return <button key={index} className={`btn btn-light btn-lg mx-3 ${selected.size === item ? 'mybackground text-light' : ''}`} onClick={() => setSelected({ ...selected, size: item })}>{item}</button>
                                                })
                                            }
                                        </div>
                                    </div>
                                    {product.stock ?
                                        <div className="product-quantity">
                                            <div className="quantity-wrapper">
                                                <div className="quantity">
                                                    <div className="btn-group">
                                                        <button className="minus fs-1" onClick={() => selected.qty > 1 ? setSelected({ ...selected, qty: selected.qty - 1 }) : null}>
                                                            -
                                                        </button>
                                                        <span className="number fs-1 text-center" style={{ width: 100 }}>{selected.qty}</span>
                                                        <button className="plus fs-1" onClick={() => selected.qty < product.stockQuantity ? setSelected({ ...selected, qty: selected.qty + 1 }) : null}>
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="wishlist">
                                                    <button title="Click to Add this Item to Wishlist" onClick={addToWishlist}>
                                                        <i className={`bi ${checkIsExist('Wishlist') ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-1`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="shop-btn" onClick={addToCart}>
                                                <i className='bi bi-cart fs-3'></i>
                                                <span>{checkIsExist('Cart') ? 'Already Added in Cart' : 'Add to Cart'}</span>
                                            </button>
                                        </div> :
                                        <div>
                                            <button className="shop-btn" onClick={addToWishlist}>
                                                <span>
                                                    <i className='bi bi-heart fs-1'></i>
                                                </span>
                                                <span>{checkIsExist('Wishlist') ? 'Already Added in Wishlist' : 'Add to Wishlist'}</span>
                                            </button>
                                        </div>
                                    }
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product product-description" style={{ marginTop: -80 }}>
                <div className="container">
                    <div className="product-detail-section">
                        <nav>
                            <div className="nav nav-tabs nav-item" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                    aria-selected="true">Description</button>
                                <button className="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review"
                                    type="button" role="tab" aria-controls="nav-review" aria-selected="false">Reviews</button>
                            </div>
                        </nav>
                        <div className="tab-content tab-item" id="nav-tabContent">

                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                                tabIndex="0" data-aos="fade-up">
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                            <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab"
                                tabIndex="0">
                                <div className="product-review-section" data-aos="fade-up">
                                    <h5 className="intro-heading">Reviews</h5>
                                    <div style={{ marginBottom: -200 }}>
                                        <Testimonial pid={product._id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProductSlider maincategory="Related Products" products={relatedProducts} />
        </>
    )
}
