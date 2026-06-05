import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UDPATE_USER, UDPATE_USER_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("user", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("user", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_USER_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("user")
    yield put({ type: GET_USER_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("user", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_USER_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("user", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_USER_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_RED, payload: action.payload })
}

export default function* UserSagas() {
    yield takeEvery(CREATE_USER, createSaga)                                //Watcher Saga
    yield takeEvery(GET_USER, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_USER, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_USER, deleteSaga)                                //Watcher Saga
}