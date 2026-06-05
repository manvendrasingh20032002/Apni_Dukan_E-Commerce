import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group mb-5">
            <Link to="/admin" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-house fs-2'></i><span className='float-end mt-2'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-card-checklist fs-2'></i><span className='float-end mt-2'>Maincategory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-card-list fs-2'></i><span className='float-end mt-2'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-list-stars fs-2'></i><span className='float-end mt-2'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-list-ol fs-2'></i><span className='float-end mt-2'>Product</span></Link>
            <Link to="/admin/feature" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-list-check fs-2'></i><span className='float-end mt-2'>Features</span></Link>
            <Link to="/admin/faq" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-question-circle fs-2'></i><span className='float-end mt-2'>Faq</span></Link>
            <Link to="/admin/setting" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-house-gear fs-2'></i><span className='float-end mt-2'>Settings</span></Link>
            <Link to="/admin/newsletter" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-envelope fs-2'></i><span className='float-end mt-2'>Newsletters</span></Link>
            <Link to="/admin/contactus" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-headphones fs-2'></i><span className='float-end mt-2'>Contact Us</span></Link>
            <Link to="/admin/checkout" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-cart-check fs-2'></i><span className='float-end mt-2'>Checkout</span></Link>
            {localStorage.getItem("role")==="Super Admin"?<Link to="/admin/user" className="list-group-item mybackground text-light" aria-current="true"><i className='bi bi-person-plus fs-2'></i><span className='float-end mt-2'>User</span></Link>:null}
        </div>
    )
}
