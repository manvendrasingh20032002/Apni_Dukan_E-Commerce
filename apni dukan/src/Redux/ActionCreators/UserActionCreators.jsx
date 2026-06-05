import { CREATE_USER, DELETE_USER, GET_USER, UDPATE_USER } from "../Constant.jsx"

export function createUser(data) {
    return {
        type: CREATE_USER,
        payload: data
    }
}

export function getUser() {
    return {
        type: GET_USER
    }
}

export function updateUser(data) {
    return {
        type: UDPATE_USER,
        payload: data
    }
}

export function deleteUser(data) {
    return {
        type: DELETE_USER,
        payload: data
    }
}