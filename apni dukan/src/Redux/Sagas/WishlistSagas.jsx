import { put, takeEvery } from "redux-saga/effects"

import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UDPATE_WISHLIST, UDPATE_WISHLIST_RED } from "../Constant"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    let response = yield createRecord("wishlist", action.payload)               //used this line in case when no file field is used
    // let response = yield createMultipartRecord("wishlist", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    yield updateRecord("wishlist", action.payload)                           //used this line in case when no file field is used
    yield put({ type: UDPATE_WISHLIST_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("wishlist", action.payload)   //used this line in case when file field is used
    // yield put({ type: UDPATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* WishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                                //Watcher Saga
    yield takeEvery(GET_WISHLIST, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_WISHLIST, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                                //Watcher Saga
}