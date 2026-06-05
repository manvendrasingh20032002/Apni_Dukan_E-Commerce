import { CREATE_CART, DELETE_CART, GET_CART, UDPATE_CART } from "../Constant.jsx"

export function createCart(data) {
    return {
        type: CREATE_CART,
        payload: data
    }
}

export function getCart() {
    return {
        type: GET_CART
    }
}

export function updateCart(data) {
    return {
        type: UDPATE_CART,
        payload: data
    }
}

export function deleteCart(data) {
    return {
        type: DELETE_CART,
        payload: data
    }
}