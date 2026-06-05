import { CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UDPATE_CHECKOUT_RED } from "../Constant"
export default function CheckoutReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CHECKOUT_RED:
            return [action.payload, ...state]

        case GET_CHECKOUT_RED:
            return action.payload

        case UDPATE_CHECKOUT_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_CHECKOUT_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
