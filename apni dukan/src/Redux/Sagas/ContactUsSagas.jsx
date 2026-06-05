import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UDPATE_CONTACT_US, UDPATE_CONTACT_US_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("contactus", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("contactus", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_CONTACT_US_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("contactus", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_CONTACT_US_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("contactus", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_CONTACT_US_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}

export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)                                //Watcher Saga
    yield takeEvery(GET_CONTACT_US, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_CONTACT_US, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)                                //Watcher Saga
}