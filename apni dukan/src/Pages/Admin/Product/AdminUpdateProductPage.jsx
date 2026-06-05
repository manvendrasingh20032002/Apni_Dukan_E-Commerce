import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import FormValidators from '../../../Validators/FormValidators'
import ImageValidators from '../../../Validators/ImageValidators'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getProduct, updateProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

let rte

let colors = ["Black", "White", "Gray", "Green", "Red", "Yellow", "Purple", "Pink", "Blue", "Brown", "Orange", "Magenta"]
let size = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]
export default function AdminUpdateProductPage() {
    let { _id } = useParams()
    let refdiv = useRef(null)

    let [oldPics, setOldPics] = useState([])
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        pic: [],
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [flag, setFlag] = useState(false)

    let navigate = useNavigate()

    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()


    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        let value = name === "pic" ? e.target.files : e.target.value

        setData({ ...data, [name]: (name === "status" || name === "stock") ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidators(e) : FormValidators(e) })
    }

    function getInputCheckbox(field, value) {
        let arr = field === "color" ? data.color : data.size
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setErrorMessage({ ...errorMessage, [field]: arr.length === 0 ? `Please Select At Least one ${field}` : "" })
        setData({ ...data, [field]: arr })
    }


    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (oldPics.length === 0 && Array.from(data.pic).length === 0) {
            setShow(true)
            setErrorMessage({ ...error, pic: "Please Upload Atleast One Pic" })
        }
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let stockQuantity = parseInt(data.stockQuantity)
            let fp = parseInt(bp - bp * d / 100)
            // dispatch(updateProduct({
            //     ...data,
            //     'maincategory': data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
            //     'subcategory': data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
            //     'brand': data.brand ? data.brand : BrandStateData[0].name,
            //     'basePrice': bp,
            //     'discount': d,
            //     'finalPrice': fp,
            //     'stockQuantity': stockQuantity,
            //     'description': rte.getHTMLCode()
            // }))

            let formData = new FormData()
            formData.append("_id", data._id)
            formData.append("name", data.name)
            formData.append("maincategory", data.maincategory._id ?? data.maincategory)
            formData.append("subcategory", data.subcategory._id ?? data.subcategory)
            formData.append("brand", data.brand._id ?? data.brand)
            formData.append("stock", data.stock)
            formData.append("basePrice", bp)
            formData.append("discount", d)
            formData.append("finalPrice", fp)
            formData.append("stockQuantity", stockQuantity)
            formData.append("description", rte.getHTMLCode())

            data.color.map(x => formData.append("color", x))
            data.size.map(x => formData.append("size", x))

            Array.from(data.pic).map(x => formData.append("pic", x))
            oldPics.map(x => formData.append("oldPics", x))

            formData.append("status", data.status)
            dispatch(updateProduct(formData))

            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            rte = new window.RichTextEditor(refdiv.current)
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x._id === _id)
                if (item) {
                    setData({ ...data, ...item })
                    setOldPics(item.pic)
                    rte.setHTMLCode(item.description)
                }
                else
                    navigate("/admin/product")
            }
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h6 className='mybackground text-light text-center p-2 fs-1 mb-3'>Update Product
                            <Link to="/admin/product"><i className='bi bi-arrow-left text-light fs-1 float-end'></i></Link>
                        </h6>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" value={data.maincategory._id} onChange={getInputData} className='form-select border-dark'>
                                        {
                                            MaincategoryStateData.filter(x => x.status).map(item => {
                                                // return <option key={item._id}>{item.name}</option>
                                                return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-3 col-sm-6 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" value={data.subcategory._id} onChange={getInputData} className='form-select border-dark'>
                                        {
                                            SubcategoryStateData.filter(x => x.status).map(item => {
                                                // return <option key={item._id}>{item.name}</option>
                                                return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-3 col-sm-6 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" value={data.brand._id} onChange={getInputData} className='form-select border-dark'>
                                        {
                                            BrandStateData.filter(x => x.status).map(item => {
                                                // return <option key={item._id}>{item.name}</option>
                                                return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" value={data.stock ? "1" : "0"} onChange={getInputData} className='form-select border-dark'>
                                        <option value="1">In Stock</option>
                                        <option value="0">Out Of Stock</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color*</label>
                                    <div className='border border-dark rounded mx-1 p-2 row'>
                                        {colors.map((item, index) => {
                                            return <div key={index} className='col-lg-2 col-md-3 col-sm-4 col-6'>
                                                <input type="checkbox" name={item} onChange={() => getInputCheckbox('color', item)} checked={data.color.includes(item)} />
                                                <label className='ms-3'>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Size*</label>
                                    <div className='border border-dark rounded mx-1 p-2 row'>
                                        {size.map((item, index) => {
                                            return <div key={index} className='col-lg-2 col-md-3 col-sm-4 col-6'>
                                                <input type="checkbox" name={item} onChange={() => getInputCheckbox('size', item)} checked={data.size.includes(item)} />
                                                <label className='ms-3'>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} placeholder='Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Description</label>
                                    <div className='border-dark' ref={refdiv}></div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} placeholder='Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select myborder'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'myborder'}`} />
                                    {show && errorMessage.pic ? errorMessage.pic.split("|").map((item, index) => {
                                        return <p className='text-danger' key={index}>{item}</p>
                                    }) : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Old Pics(Click on Image to Remove)</label>
                                    <div>
                                        {oldPics.map((item, index) => {
                                            return <img key={index} onClick={() => {
                                                oldPics.splice(index, 1)
                                                setFlag(!flag)
                                            }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={70} width={80} className='m-2' />
                                        })}
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary btn-lg w-100 mybackground p-3'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ height: 100 }}></div>
        </>
    )
}
