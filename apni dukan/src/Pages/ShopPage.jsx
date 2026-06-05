import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import SingleProduct from '../Components/SingleProduct'
import { useSearchParams } from 'react-router-dom'

let colors = ["Black", "White", "Gray", "Green", "Red", "Yellow", "Purple", "Pink", "Blue", "Brown", "Orange", "Magenta"]
let size = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]
export default function ShopPage() {
    let [searchParams] = useSearchParams()

    let [showFilterOption, setShowFilterOption] = useState(false)
    let [data, setData] = useState([])
    let [sort, setSort] = useState("1")
    let [flag, setFlag] = useState(false)

    let [min, setMin] = useState(-1)
    let [max, setMax] = useState(-1)

    let [selected, setSelected] = useState({
        mc: [],
        sc: [],
        br: [],
        color: [],
        size: []
    })

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    function selectCategory(field, value) {
        let arr = selected[field]

        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setSelected({ ...selected, [field]: arr })
        filterProducts({ ...selected, [field]: arr })
    }

    function checkUnion(arr1, arr2) {
        let set1 = new Set(arr1)
        let set2 = new Set(arr2)
        return (set1.intersection(set2)).size === 0 ? false : true
    }

    function filterProducts(selected) {
        let data = ProductStateData.filter(x => x.status &&
            (selected.mc.length === 0 || selected?.mc?.includes(x.maincategory?.name)) &&
            (selected.sc.length === 0 || selected?.sc?.includes(x.subcategory?.name)) &&
            (selected.br.length === 0 || selected?.br?.includes(x.brand?.name)) &&
            (selected.color.length === 0 || checkUnion(selected.color, x.color)) &&
            (selected.size.length === 0 || checkUnion(selected.size, x.size))
        )
        if (min !== -1 && max !== -1) {
            data = data.filter(x => x.finalPrice >= min && x.finalPrice <= max)
        }
        sortFilter(data, sort)
    }

    function sortFilter(data, option) {
        setSort(option)
        if (option === "1")
            setData(data.sort((x, y) => y._id.localeCompare(x._id)))
        else if (option === "2")
            setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
        else
            setData(data.sort((x, y) => y.finalPrice - x.finalPrice))

        setFlag(!flag)
    }

    function searchProductsFilter(search) {
        let ch = search.toLocaleLowerCase()
        let data = ProductStateData.filter(x => x.status &&
            (x.name.toLocaleLowerCase().includes(ch)) ||
            (x.maincategory?.name.toLocaleLowerCase() === ch) ||
            (x.subcategory?.name.toLocaleLowerCase() === ch) ||
            (x.brand?.name.toLocaleLowerCase() === ch) ||
            (x.description?.toLocaleLowerCase().includes(ch))
        )
        sortFilter(data, sort)
    }

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

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                if (searchParams.get("search")) {
                    searchProductsFilter(searchParams.get("search"))
                }
                else {
                    let selected = {
                        mc: searchParams.get("mc") ? [searchParams.get("mc")] : [],
                        sc: searchParams.get("sc") ? [searchParams.get("sc")] : [],
                        br: searchParams.get("br") ? [searchParams.get("br")] : [],
                        color: [],
                        size: []
                    }
                    setSelected({ ...selected })
                    filterProducts(selected)
                }
            }
        })()
    }, [ProductStateData.length, searchParams])
    return (
        <>
            <Breadcrum title="Shop" />
            <button className='d-block d-md-none ms-5 btn btn-primary mybackground' onClick={() => setShowFilterOption(!showFilterOption)}>Apply Filters</button>
            <section className="product product-sidebar footer-padding">
                <div className="container">
                    <div className="row g-5">
                        <div className={`${showFilterOption ? 'd-block' : 'd-none'} d-md-block col-md-3`}>
                            <div className="sidebar" data-aos="fade-right">
                                <div className="sidebar-section">
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Main Categories</h5>
                                        <div className="sidebar-item">
                                            <ul className="sidebar-list">
                                                {
                                                    MaincategoryStateData?.filter(x => x.status)?.map(item => {
                                                        return <li key={item._id}>
                                                            <input type="checkbox" onChange={() => selectCategory('mc', item.name)} checked={selected?.mc?.includes(item.name)} id="mobile" name="mobile" />
                                                            <label htmlFor="mobile">{item.name}</label>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Sub Categories</h5>
                                        <div className="sidebar-item">
                                            <ul className="sidebar-list">
                                                {
                                                    SubcategoryStateData?.filter(x => x.status)?.map(item => {
                                                        return <li key={item._id}>
                                                            <input type="checkbox" onChange={() => selectCategory('sc', item.name)} checked={selected?.sc?.includes(item.name)} />
                                                            <label>{item.name}</label>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Brands</h5>
                                        <div className="sidebar-item">
                                            <ul className="sidebar-list">
                                                {
                                                    BrandStateData?.filter(x => x.status)?.map(item => {
                                                        return <li key={item._id}>
                                                            <input type="checkbox" onChange={() => selectCategory('br', item.name)} checked={selected?.br?.includes(item.name)} />
                                                            <label>{item.name}</label>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Color</h5>
                                        <div className="sidebar-item">
                                            <ul className="sidebar-list">
                                                {
                                                    colors.map((item, index) => {
                                                        return <li key={index}>
                                                            <input type="checkbox" onChange={() => selectCategory('color', item)} checked={selected?.color?.includes(item)} />
                                                            <label>{item}</label>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Size</h5>
                                        <div className="sidebar-item">
                                            <ul className="sidebar-list">
                                                {
                                                    size.map((item, index) => {
                                                        return <li key={index}>
                                                            <input type="checkbox" onChange={() => selectCategory('size', item)} checked={selected?.size?.includes(item)} />
                                                            <label>{item}</label>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-wrapper mt-3 mb-5">
                                        <h5 className="wrapper-heading">Price Filter</h5>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            filterProducts(selected)
                                        }}>
                                            <div className="row">
                                                <div className="col-6 mb-3">
                                                    <input type="number" name="min" onChange={(e) => setMin(e.target.value)} placeholder='Min. AMount' className='form-control' />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <input type="number" name="max" onChange={(e) => setMax(e.target.value)} placeholder='Max. AMount' className='form-control' />
                                                </div>

                                                <div className="col-12">
                                                    <button type="submit" className='btn btn-primary mybackground w-100 btn-lg'>Apply</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="product-sidebar-section" data-aos="fade-up">
                                <div className="row g-5">
                                    <div className="col-lg-12">
                                        <div className="product-sorting-section">
                                            <div className="result">
                                                <p>Total <span>{data.length} results</span></p>
                                            </div>
                                            <div className="product-sorting me-5" style={{ width: 300 }}>
                                                <label>SortBy</label>
                                                <select name="sort" onChange={(e) => sortFilter(data, e.target.value)} className='form-select'>
                                                    <option value="1">Latest</option>
                                                    <option value="2">Price : Low to High</option>
                                                    <option value="3">Price : High to Low</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        data.map(item => {
                                            return <div className="col-lg-4 col-md-6" key={item._id}>
                                                <SingleProduct item={item} />
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
