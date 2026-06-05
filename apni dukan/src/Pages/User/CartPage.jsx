import React from 'react'
import Breadcrum from '../../Components/Breadcrum'
import Cart from '../../Components/User/Cart'

export default function CartPage() {
    return (
        <>
            <Breadcrum title="Manage Your Cart" />
            <Cart title="Cart Page" />
        </>
    )
}
