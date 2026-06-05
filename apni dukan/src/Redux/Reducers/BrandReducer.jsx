import { CREATE_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UDPATE_BRAND_RED } from "../Constant"
export default function BrandReducer(state = [], action) {
    switch (action.type) {
        case CREATE_BRAND_RED:
            return [...state, action.payload]

        case GET_BRAND_RED:
            return action.payload

        case UDPATE_BRAND_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_BRAND_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
