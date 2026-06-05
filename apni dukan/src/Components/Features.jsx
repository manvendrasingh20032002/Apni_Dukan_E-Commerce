import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
export default function Features() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getFeature()))()
    }, [FeatureStateData.length])
    return (
        <>
            <section className="about-service product ">
                <div className="container">
                    <div className="about-service-section">
                        <div className="row">
                            {
                                FeatureStateData?.filter(x => x.status)?.map(item => {
                                    return <div key={item._id} className='col-lg-3 col-md-4 col-sm-6'>
                                        <div className="about-wrapper m-auto">
                                            <div className="mybackground px-5 py-4" style={{ borderRadius: "50%" }}>
                                                <span className='text-light' style={{ fontSize: 60 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                                            </div>
                                            <div className="wrapper-info">
                                                <h5 className="wrapper-details about-details">{item.name}</h5>
                                                <p className=''>{item.shortDescription}</p>
                                            </div>
                                        </div>
                                        <div className="seperator">
                                        </div>
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
