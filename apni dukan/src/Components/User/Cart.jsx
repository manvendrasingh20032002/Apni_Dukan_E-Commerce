import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCart, updateCart, deleteCart } from "../../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { createWishlist, getWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Cart({ title, selected }) {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let [checkOutOfStock, setCheckOutOfStock] = useState(false)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteCart({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    function updateRecord(_id, option) {
        let item = data.find(x => x._id === _id)
        let index = data.findIndex(x => x._id === _id)
        if ((option === "Dec" && item.qty === 1) || (option === "Inc" && item.qty === item.product?.stockQuantity))
            return
        else if (option === "Dec") {
            item.qty = item.qty - 1
            item.total = item.total - item.product?.finalPrice
        }
        else {
            item.qty = item.qty + 1
            item.total = item.total + item.product?.finalPrice
        }
        data[index] = { ...item }
        dispatch(updateCart(item))
        setData(data)
        calculate(data)
    }

    function calculate(cart) {
        let total = 0
        cart.forEach(x => total = total + x.total)
        if (total < 1000 && total > 0) {
            setShipping(150)
            setTotal(total + 150)
        }
        else {
            setShipping(0)
            setTotal(total)
        }
        setSubtotal(total)
    }

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            deliveryAddress: selected?.deliveryAddress,
            paymentMode: selected?.paymentMode,
            orderStatus: "Order is Placed",
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: data
        }
        dispatch(createCheckout({ ...item }))
        data.forEach(x => {
            let product = ProductStateData.find(p => p._id === x.product?._id)
            product.stockQuantity = product.stockQuantity - x.qty
            product.stock = product.stockQuantity === 0 ? false : true
            dispatch(updateProduct({ ...product, option: "Checkout" }))

            dispatch(deleteCart({ _id: x._id }))
        })
        if (selected.paymentMode === "COD")
            navigate("/order-confirmation")
        else
            navigate("/payment/-1")
    }

    function addToWishlist(_id, pid) {
        let product = ProductStateData.find(x => x._id === pid)
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === product._id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: product._id,

                //Remove Below Lines in Case of Real Backend
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                stockQuantity: product.stockQuantity,
                price: product.finalPrice,
                pic: product.pic[0]
            }
            dispatch(createWishlist(item))
        }
        dispatch(deleteCart({ _id: _id }))
        data = data.filter(x => x._id !== _id)
        checkOutOfStock = false
        data.forEach(x => {
            if (x.stockQuantity === 0)
                checkOutOfStock = true
        })
        setCheckOutOfStock(checkOutOfStock)
        setData(data)
        calculate(data)
    }


    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length && ProductStateData.length) {
                setData(CartStateData)
                calculate(CartStateData)
            }
            else {
                setData([])
                calculate([])
            }
        })()
    }, [CartStateData.length, ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])
    return (
        <>
            <section className="product-cart product footer-padding">
                {data.length ?
                    <div className="container">
                        <div className="cart-section">
                            <table>
                                <tbody>
                                    <tr className="table-row table-top-row">
                                        <td className="table-wrapper wrapper-product">
                                            <h5 className="table-heading">PRODUCT</h5>
                                        </td>
                                        {title === "Cart Page" ?
                                            <>
                                                <td className="table-wrapper">
                                                    <div className="table-wrapper-center">
                                                        <h5 className="table-heading">Brand</h5>
                                                    </div>
                                                </td>
                                                <td className="table-wrapper">
                                                    <div className="table-wrapper-center">
                                                        <h5 className="table-heading">Stock</h5>
                                                    </div>
                                                </td>
                                            </> : null}
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">PRICE</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">QUANTITY</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper wrapper-total">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">TOTAL</h5>
                                            </div>
                                        </td>
                                        {title === "Cart Page" ? <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">ACTION</h5>
                                            </div>
                                        </td> : null}
                                    </tr>
                                    {
                                        data.map(item => {
                                            return <tr className="table-row ticket-row" key={item._id}>
                                                <td className="table-wrapper wrapper-product">
                                                    <div className="wrapper">
                                                        {title === "Cart Page" ? <div className="wrapper-img">
                                                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} target='_blank' rel='noreferrer'>
                                                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} alt="img" />
                                                            </Link>
                                                        </div> : null}
                                                        <div className="wrapper-content">
                                                            <h5 className="heading">{item.product?.name}</h5>
                                                            <h6 className='fs-4'>({item.color}/{item.size})</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                {
                                                    title === "Cart Page" ?
                                                        <>
                                                            <td className="table-wrapper">
                                                                <div className="table-wrapper-center">
                                                                    <h5 className="heading">{item.product?.brand?.name}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="table-wrapper">
                                                                <div className="table-wrapper-center">
                                                                    <h5 className="heading">{`${item.product?.stockQuantity ? item.product?.stockQuantity + ' Left in Stock' : 'Out Of Stock'}`}</h5>
                                                                </div>
                                                            </td>
                                                        </> : null
                                                }
                                                <td className="table-wrapper">
                                                    <div className="table-wrapper-center">
                                                        <h5 className="heading">&#8377;{item.product?.finalPrice}</h5>
                                                    </div>
                                                </td>
                                                <td className="table-wrapper">
                                                    <div className="table-wrapper-center">
                                                        {item.product?.stockQuantity ?
                                                            <div className="quantity">
                                                                {title === "Cart Page" ? <button className='btn' onClick={() => updateRecord(item._id, 'Dec')}><i className='bi bi-dash fs-1'></i></button> : null}
                                                                <span className="number">{item.qty}</span>
                                                                {title === "Cart Page" ? <button className='btn' onClick={() => updateRecord(item._id, 'Inc')}><i className='bi bi-plus fs-1'></i></button> : null}
                                                            </div> :
                                                            title === "Checkout Page" ?
                                                                <span className="number">{item.qty}</span> :
                                                                <button onClick={() => addToWishlist(item._id, item.product)} className='shop-btn'>Move to Wishlist</button>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="table-wrapper wrapper-total">
                                                    <div className="table-wrapper-center">
                                                        <h5 className="heading">&#8377;{item.total}</h5>
                                                    </div>
                                                </td>
                                                {
                                                    title === "Cart Page" ? <td className="table-wrapper">
                                                        <div className="table-wrapper-center">
                                                            <button className='btn' onClick={() => deleteRecord(item._id)}><i className='bi bi-x fs-1'></i></button>
                                                        </div>
                                                    </td> : null
                                                }
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6"></div>
                            <div className={title === "Cart Page" ? 'col-md-6' : 'col-12'}>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal Amount</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping Amount</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Amount</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            {
                                                checkOutOfStock ?
                                                    <p className='text-danger'>One or More Products from Your Cart Are Out of Stock, Please Remove Them or Move Them to Wishlist to Place Orders</p>
                                                    :
                                                    <td colSpan={2}>
                                                        {title === "Cart Page" ?
                                                            <Link to="/checkout" className='shop-btn w-100'>Proceed To Checkout</Link> :
                                                            selected.deliveryAddress.address ?
                                                                <button className='shop-btn w-100' onClick={placeOrder}>Place Order</button> :
                                                                <Link className='shop-btn w-100' to="/profile?option=address">Please Provide an Address to Place Order</Link>
                                                        }
                                                    </td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> :
                    <div className='container my-5 text-center'>
                        <h5>No Items in Cart</h5>
                        <Link to="/shop" className='shop-btn' style={{ width: 250 }}>Shop Now</Link>
                    </div>}
            </section>
        </>
    )
}
