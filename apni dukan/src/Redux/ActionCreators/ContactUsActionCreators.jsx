import { CREATE_CONTACT_US, DELETE_CONTACT_US, GET_CONTACT_US, UDPATE_CONTACT_US } from "../Constant.jsx"

export function createContactUs(data) {
    return {
        type: CREATE_CONTACT_US,
        payload: data
    }
}

export function getContactUs() {
    return {
        type: GET_CONTACT_US
    }
}

export function updateContactUs(data) {
    return {
        type: UDPATE_CONTACT_US,
        payload: data
    }
}

export function deleteContactUs(data) {
    return {
        type: DELETE_CONTACT_US,
        payload: data
    }
}