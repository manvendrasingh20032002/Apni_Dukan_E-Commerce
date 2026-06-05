import { CREATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST, UDPATE_WISHLIST } from "../Constant.jsx"

export function createWishlist(data) {
    return {
        type: CREATE_WISHLIST,
        payload: data
    }
}

export function getWishlist() {
    return {
        type: GET_WISHLIST
    }
}

export function updateWishlist(data) {
    return {
        type: UDPATE_WISHLIST,
        payload: data
    }
}

export function deleteWishlist(data) {
    return {
        type: DELETE_WISHLIST,
        payload: data
    }
}