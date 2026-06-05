import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UDPATE_CART, UDPATE_CART_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("cart", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("cart", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("cart")
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("cart", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_CART_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("cart", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_CART_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* CartSagas() {
    yield takeEvery(CREATE_CART, createSaga)                                //Watcher Saga
    yield takeEvery(GET_CART, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_CART, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_CART, deleteSaga)                                //Watcher Saga
}