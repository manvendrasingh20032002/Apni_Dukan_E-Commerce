import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, UDPATE_PRODUCT } from "../Constant.jsx"

export function createProduct(data) {
    return {
        type: CREATE_PRODUCT,
        payload: data
    }
}

export function getProduct() {
    return {
        type: GET_PRODUCT
    }
}

export function updateProduct(data) {
    return {
        type: UDPATE_PRODUCT,
        payload: data
    }
}

export function deleteProduct(data) {
    return {
        type: DELETE_PRODUCT,
        payload: data
    }
}