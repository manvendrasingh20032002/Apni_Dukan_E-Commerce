import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UDPATE_FEATURE, UDPATE_FEATURE_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("feature", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("feature", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("feature", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_FEATURE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("feature", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)                                //Watcher Saga
    yield takeEvery(GET_FEATURE, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_FEATURE, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)                                //Watcher Saga
}