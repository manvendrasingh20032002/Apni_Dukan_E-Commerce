import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators"
export default function TermsAndConditionsPage() {
    let [settingData, setSettingData] = useState({
        termCondition: ''
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let data = SettingStateData[0]
                setSettingData({
                    termCondition: data.termCondition ? data.termCondition : settingData.termCondition,
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title="Terms and Conditions" />
            <section className="product privacy footer-padding">
                <div className="container">
                    <div dangerouslySetInnerHTML={{ __html: settingData.termCondition }} />
                </div>
            </section>
        </>
    )
}
