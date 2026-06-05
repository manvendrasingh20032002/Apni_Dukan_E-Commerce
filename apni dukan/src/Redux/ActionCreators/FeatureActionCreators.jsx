import { CREATE_FEATURE, DELETE_FEATURE, GET_FEATURE, UDPATE_FEATURE } from "../Constant.jsx"

export function createFeature(data) {
    return {
        type: CREATE_FEATURE,
        payload: data
    }
}

export function getFeature() {
    return {
        type: GET_FEATURE
    }
}

export function updateFeature(data) {
    return {
        type: UDPATE_FEATURE,
        payload: data
    }
}

export function deleteFeature(data) {
    return {
        type: DELETE_FEATURE,
        payload: data
    }
}