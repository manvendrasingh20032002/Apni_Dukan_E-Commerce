import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return (
        <div className="product-wrapper">
            <div className="product-img">
                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} className='w-100' style={{ height: 300 }}
                    alt="product-img" />
                <div className="product-cart-items">
                    <Link to={`/shop?br=${item.brand.name}`} className="cart cart-item">
                        <span className='bg-light mybackground text-light p-3 rounded-pill'>
                            {item.brand.name}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="product-info">
                <div className="ratings" style={{ position: "absolute", right: 30, bottom: 110 }}>
                    <i className='bi bi-star-fill text-warning'></i>
                    <i className='bi bi-star-fill text-warning'></i>
                    <i className='bi bi-star-fill text-warning'></i>
                    <i className='bi bi-star-fill text-warning'></i>
                    <i className='bi bi-star-fill text-warning'></i>
                </div>
                <span style={{ position: "absolute", left: 30, bottom: 110 }}>{item.discount}% off</span>
                <div className="product-description mt-5">
                    <Link to={`/product/${item._id}`} className="product-details fs-4">{item.name}</Link>
                    <div className="price">
                        <span className="price-cut">&#8377;{item.basePrice}</span>
                        <span className="new-price">&#8377;{item.finalPrice}</span>
                    </div>
                </div>
                <div className="product-description mt-3">
                    <Link to={`/product/${item._id}`} className="product-details">{item.stock ? "In Stock" : "Out Of Stock"}</Link>
                </div>
            </div>
            <div className="product-cart-btn">
                <Link to={`/product/${item._id}`} className="product-btn">Add To Cart</Link>
            </div>
        </div>
    )
}
