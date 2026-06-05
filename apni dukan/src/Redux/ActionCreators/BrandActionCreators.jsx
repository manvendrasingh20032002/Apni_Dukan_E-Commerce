import { CREATE_BRAND, DELETE_BRAND, GET_BRAND, UDPATE_BRAND } from "../Constant.jsx"

export function createBrand(data) {
    return {
        type: CREATE_BRAND,
        payload: data
    }
}

export function getBrand() {
    return {
        type: GET_BRAND
    }
}

export function updateBrand(data) {
    return {
        type: UDPATE_BRAND,
        payload: data
    }
}

export function deleteBrand(data) {
    return {
        type: DELETE_BRAND,
        payload: data
    }
}