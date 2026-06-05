import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED, UDPATE_WISHLIST_RED } from "../Constant"
export default function WishlistReducer(state = [], action) {
    switch (action.type) {
        case CREATE_WISHLIST_RED:
            return [...state, action.payload]

        case GET_WISHLIST_RED:
            return action.payload

        case UDPATE_WISHLIST_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_WISHLIST_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
