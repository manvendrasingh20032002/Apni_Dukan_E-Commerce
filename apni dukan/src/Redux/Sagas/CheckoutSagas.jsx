import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UDPATE_CHECKOUT, UDPATE_CHECKOUT_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("checkout", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("checkout", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("checkout", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_CHECKOUT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("checkout", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* CheckoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)                                //Watcher Saga
    yield takeEvery(GET_CHECKOUT, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_CHECKOUT, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)                                //Watcher Saga
}