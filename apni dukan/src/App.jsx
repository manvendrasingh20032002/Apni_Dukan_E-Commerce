import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturesPage from './Pages/FeaturesPage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import TestimonialPage from './Pages/TestimonialPage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import Error404Page from './Pages/Error404Page'
import PrivacyPolicyPage from './Pages/Policies/PrivacyPolicyPage'
import TermsAndConditions from './Pages/Policies/TermsAndConditions'

import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import CheckoutPage from './Pages/User/CheckoutPage'
import OrderConfirmation from './Pages/User/OrderConfirmation'
import Payment from "./Pages/User/Payment"

import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/Maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/Maincategory/AdminUpdateMaincategoryPage'


import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminCreateSubcategoryPage from './Pages/Admin/Subcategory/AdminCreateSubcategoryPage'
import AdminUpdateSubcategoryPage from './Pages/Admin/Subcategory/AdminUpdateSubcategoryPage'

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage'


import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminCreateFaqPage from './Pages/Admin/Faq/AdminCreateFaqPage'
import AdminUpdateFaqPage from './Pages/Admin/Faq/AdminUpdateFaqPage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductPage from './Pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './Pages/Admin/Product/AdminUpdateProductPage'


import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'

import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'

import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'


import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminCreateUserPage from './Pages/Admin/User/AdminCreateUserPage'
import AdminUpdateUserPage from './Pages/Admin/User/AdminUpdateUserPage'
import ForgetPassword1Page from './Pages/User/ForgetPassword1Page'
import ForgetPassword2Page from './Pages/User/ForgetPassword2Page'
import ForgetPassword3Page from './Pages/User/ForgetPassword3Page'

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/features' element={<FeaturesPage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/product/:_id' element={<ProductPage />} />
                <Route path='/testimonial' element={<TestimonialPage />} />
                <Route path='/faq' element={<FaqPage />} />
                <Route path='/contactus' element={<ContactUsPage />} />
                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />

                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                <Route path='/terms-conditions' element={<TermsAndConditions />} />

                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/forget-password-1' element={<ForgetPassword1Page />} />
                <Route path='/forget-password-2' element={<ForgetPassword2Page />} />
                <Route path='/forget-password-3' element={<ForgetPassword3Page />} />

                {/* User Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/order-confirmation' element={<OrderConfirmation />} />
                            <Route path='/payment/:_id' element={<Payment />} />
                        </> : null
                }


                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
                        <>
                            <Route path='/admin' element={<AdminHomePage />} />

                            <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
                            <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
                            <Route path='/admin/maincategory/update/:_id' element={<AdminUpdateMaincategoryPage />} />

                            <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
                            <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
                            <Route path='/admin/subcategory/update/:_id' element={<AdminUpdateSubcategoryPage />} />

                            <Route path='/admin/brand' element={<AdminBrandPage />} />
                            <Route path='/admin/brand/create' element={<AdminCreateBrandPage />} />
                            <Route path='/admin/brand/update/:_id' element={<AdminUpdateBrandPage />} />

                            <Route path='/admin/feature' element={<AdminFeaturePage />} />
                            <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
                            <Route path='/admin/feature/update/:_id' element={<AdminUpdateFeaturePage />} />

                            <Route path='/admin/faq' element={<AdminFaqPage />} />
                            <Route path='/admin/faq/create' element={<AdminCreateFaqPage />} />
                            <Route path='/admin/faq/update/:_id' element={<AdminUpdateFaqPage />} />

                            <Route path='/admin/setting' element={<AdminSettingPage />} />

                            <Route path='/admin/product' element={<AdminProductPage />} />
                            <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
                            <Route path='/admin/product/update/:_id' element={<AdminUpdateProductPage />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

                            <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                            <Route path='/admin/contactus/show/:_id' element={<AdminContactUsShowPage />} />


                            <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
                            <Route path='/admin/checkout/show/:_id' element={<AdminCheckoutShowPage />} />

                            <Route path='/admin/user' element={<AdminUserPage />} />
                            <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
                            <Route path='/admin/user/update/:_id' element={<AdminUpdateUserPage />} />
                        </> : null
                }


                <Route path='/*' element={<Error404Page />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
