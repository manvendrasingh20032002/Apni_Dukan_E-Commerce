import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UDPATE_TESTIMONIAL_RED } from "../Constant"
export default function TestimonialReducer(state = [], action) {
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED:
            return [...state, action.payload]

        case GET_TESTIMONIAL_RED:
            return action.payload

        case UDPATE_TESTIMONIAL_RED:
            let index = state.findIndex(x => x._id === action.payload._id)
            state[index] = { ...action.payload }
            return state

        case DELETE_TESTIMONIAL_RED:
            return state.filter(x => x._id !== action.payload._id)

        default:
            return state
    }
}
