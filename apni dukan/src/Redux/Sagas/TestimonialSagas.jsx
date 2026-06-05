import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UDPATE_TESTIMONIAL, UDPATE_TESTIMONIAL_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("testimonial", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("testimonial", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("testimonial", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_TESTIMONIAL_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("testimonial", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_TESTIMONIAL_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* TestimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)                                //Watcher Saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_TESTIMONIAL, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)                                //Watcher Saga
}