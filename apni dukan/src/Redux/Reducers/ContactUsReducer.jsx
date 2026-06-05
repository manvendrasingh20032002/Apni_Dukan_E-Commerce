import { CREATE_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_CONTACT_US_RED, UDPATE_CONTACT_US_RED } from "../Constant"
export default function ContactUsReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CONTACT_US_RED:
            return [...state, action.payload]

        case GET_CONTACT_US_RED:
            return action.payload

        case UDPATE_CONTACT_US_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_CONTACT_US_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
