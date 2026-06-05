import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators"
export default function PrivacyPolicyPage() {
    let [settingData, setSettingData] = useState({
        privacyPolicy: ''
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let data = SettingStateData[0]
                setSettingData({
                    privacyPolicy: data.privacyPolicy ? data.privacyPolicy : settingData.privacyPolicy,
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title="Privacy Policy" />
            <section className="privacy footer-padding">
                <div className="container">
                    <div dangerouslySetInnerHTML={{ __html: settingData.privacyPolicy }} />
                </div>
            </section>
        </>
    )
}
