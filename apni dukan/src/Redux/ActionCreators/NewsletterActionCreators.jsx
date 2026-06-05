import { CREATE_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER, UDPATE_NEWSLETTER } from "../Constant.jsx"

export function createNewsletter(data) {
    return {
        type: CREATE_NEWSLETTER,
        payload: data
    }
}

export function getNewsletter() {
    return {
        type: GET_NEWSLETTER
    }
}

export function updateNewsletter(data) {
    return {
        type: UDPATE_NEWSLETTER,
        payload: data
    }
}

export function deleteNewsletter(data) {
    return {
        type: DELETE_NEWSLETTER,
        payload: data
    }
}