import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UDPATE_FAQ, UDPATE_FAQ_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("faq", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("faq", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("faq", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_FAQ_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("faq", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_FAQ_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}

export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)                                //Watcher Saga
    yield takeEvery(GET_FAQ, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_FAQ, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_FAQ, deleteSaga)                                //Watcher Saga
}