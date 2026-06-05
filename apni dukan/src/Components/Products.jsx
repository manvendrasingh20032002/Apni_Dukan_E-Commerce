import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'

export default function Products({ maincategory, products }) {
    let [selected, setSelected] = useState("")
    return (
        <>
            <section className="product flash-sale">
                <div className="container">
                    <div className="section-title">
                        <h5>Flash Sale</h5>
                        <div className="countdown-section">
                            {
                                maincategory?.filter(x => x.status).map(item => {
                                    return <div className="countdown-items" style={{ cursor: "pointer" }} onClick={() => setSelected(item.name)} key={item._id}>
                                        <span className="text">{item.name}</span>
                                    </div>
                                })
                            }
                        </div>
                        <Link to="/shop" className="view">View All</Link>
                    </div>
                    <div className="flash-sale-section">
                        <div className="row g-5">
                            {
                                products?.filter(x => x.status && (selected === "" || x.maincategory.name === selected)).slice(0, 12).map(item => {
                                    return <div className="col-lg-3 col-md-6" key={item._id}>
                                        <SingleProduct item={item} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
