import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteWishlist, getWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
import { Link } from 'react-router-dom'
export default function Wishlist() {
    let [data, setData] = useState([])

    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
            dispatch(deleteWishlist({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
            if (WishlistStateData.length) {
                setData(WishlistStateData)
            }
        })()
    }, [WishlistStateData.length])
    return (
        <div className="wishlist">
            <div className="cart-content">
                <h5 className="cart-heading">Your Wishlist Items</h5>
                <h6 className="fs-3">Total : {data.length}</h6>
            </div>
            <div className="cart-section wishlist-section">
                {
                    data.length ?
                        <div className="table-responsive">
                            <table>
                                <tbody>
                                    <tr className="table-row table-top-row">
                                        <td className="table-wrapper wrapper-product">
                                            <h5 className="table-heading">PRODUCT</h5>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">PRICE</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">Stock</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">Color</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">Size</h5>
                                            </div>
                                        </td>
                                        <td className="table-wrapper">
                                            <div className="table-wrapper-center">
                                                <h5 className="table-heading">ACTION</h5>
                                            </div>
                                        </td>
                                    </tr>
                                    {data.map(item => {
                                        return <tr className="table-row ticket-row" key={item._id}>
                                            <td className="table-wrapper wrapper-product">
                                                <div className="wrapper">
                                                    <div className="wrapper-img">
                                                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`} target="_blank" rel="noreferrer">
                                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`}
                                                                alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="wrapper-content">
                                                        <h5 className="heading">{item.product?.name}</h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-wrapper">
                                                <div className="table-wrapper-center">
                                                    <h5 className="heading">&#8377;{item.product?.finalPrice}</h5>
                                                </div>
                                            </td>
                                            <td className="table-wrapper">
                                                <div className="table-wrapper-center">
                                                    <h5 className="heading">{`${item.product?.stockQuantity} Left In Stock`}</h5>
                                                </div>
                                            </td>
                                            <td className="table-wrapper">
                                                <div className="table-wrapper-center">
                                                    <h5 className="heading">{item.product?.color?.join(",")}</h5>
                                                </div>
                                            </td>
                                            <td className="table-wrapper">
                                                <div className="table-wrapper-center">
                                                    <h5 className="heading">{item.product?.size?.join(",")}</h5>
                                                </div>
                                            </td>
                                            <td className="table-wrapper">
                                                <div className="table-wrapper-center">
                                                    {item.product?.stockQuantity ? <Link className='btn' to={`/product/${item.product?._id}`}><i className='bi bi-cart fs-2'></i></Link> : null}
                                                    <button className='btn' onClick={() => deleteRecord(item._id)}><i className='bi bi-x fs-1 text-danger'></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div> :
                        <div className='mt-4'>
                            <h5>No Items in Wishlist</h5>
                            <Link to="/shop" className='shop-btn' style={{ width: 250 }}>Shop</Link>
                        </div>
                }
            </div>
        </div>
    )
}
