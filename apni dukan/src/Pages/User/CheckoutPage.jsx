import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import Cart from '../../Components/User/Cart'

export default function CheckoutPage() {
    let [user, setUser] = useState({ address: [] })
    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem('userid')}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            setUser({ ...response.data })
            if (response.data?.address?.length)
                setSelected({ ...selected, deliveryAddress: { ...response.data.address[0] } })
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Place Your Order" />

            <section className="checkout footer-padding">
                <div className="container">
                    <div className="checkout-section">
                        <div className="row gy-5">
                            <div className="col-lg-6">
                                <div className="checkout-wrapper">
                                    <div className="account-section billing-section">
                                        <h5 className="wrapper-heading mb-5">Billing Details</h5>
                                        {
                                            user?.address?.map((item, index) => {
                                                return <div key={index} className='card p-5 mb-3' onClick={() => setSelected({ ...selected, deliveryAddress: { ...user.address[index] } })}>
                                                    <div className="seller-info position-relative">
                                                        <div className="btn-group position-absolute top-0 end-0">
                                                            {selected?.deliveryAddress?.address === item.address ? <i className='fs-1 bi bi-check'></i> : null}
                                                        </div>
                                                        <table>
                                                            <tbody className='table'>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <td>{item.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Contact</th>
                                                                    <td>{item.email},{item.phone}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Address</th>
                                                                    <td>{item.address}<br />
                                                                        {item.pin},{item.city},{item.state}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <h5 className="wrapper-heading mb-5">Payment Mode</h5>
                                        <div className="card px-5 py-3" onClick={() => setSelected({ ...selected, paymentMode: "COD" })}>
                                            Cash On Delivery
                                            <div className="btn-group position-absolute top-0 end-0">
                                                {selected?.paymentMode === "COD" ? <i className='fs-1 bi bi-check'></i> : null}
                                            </div>
                                        </div>
                                        <div className="card px-5 py-3" onClick={() => setSelected({ ...selected, paymentMode: "Net Banking" })}>
                                            Net Banking/Card/UPI
                                            <div className="btn-group position-absolute top-0 end-0">
                                                {selected?.paymentMode === "Net Banking" ? <i className='fs-1 bi bi-check'></i> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="checkout-wrapper">
                                    <Cart selected={selected} title="Checkout Page" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
