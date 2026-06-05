import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UDPATE_PRODUCT, UDPATE_PRODUCT_RED } from "../Constant"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { createMultipartRecord, deleteRecord, getRecord, updateRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    // let response = yield createRecord("product", action.payload)               //used this line in case when no file field is used
    let response = yield createMultipartRecord("product", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_PRODUCT_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSaga(action) {                                                   //worker saga
    if (action.payload?.option) {
        yield updateRecord("product", action.payload)                           //used this line in case when no file field is used
        yield put({ type: UDPATE_PRODUCT_RED, payload: action.payload })
    }
    else {
        let response = yield updateMultipartRecord("product", action.payload)   //used this line in case when file field is used
        yield put({ type: UDPATE_PRODUCT_RED, payload: response })
    }
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* ProductSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)                                //Watcher Saga
    yield takeEvery(GET_PRODUCT, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_PRODUCT, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_PRODUCT, deleteSaga)                                //Watcher Saga
}