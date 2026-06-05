import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


// import Breadcrum from '../../Components/Breadcrum'
import AdminSidebar from '../../Components/Admin/AdminSidebar'

export default function AdminHomePage() {
    let [data, setData] = useState({})
    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            if (response.result === "Done")
                setData(response.data)
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            {/* <Breadcrum title="Admin" /> */}

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1'>Admin Profile</h6>
                        <table className='table table-bordered table-striped'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>User Name</th>
                                    <td>{data.username}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{data.role}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
