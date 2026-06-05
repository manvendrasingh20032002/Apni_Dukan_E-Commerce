import { CREATE_USER_RED, DELETE_USER_RED, GET_USER_RED, UDPATE_USER_RED } from "../Constant"
export default function UserReducer(state = [], action) {
    switch (action.type) {
        case CREATE_USER_RED:
            return [...state, action.payload]

        case GET_USER_RED:
            return action.payload

        case UDPATE_USER_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_USER_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
