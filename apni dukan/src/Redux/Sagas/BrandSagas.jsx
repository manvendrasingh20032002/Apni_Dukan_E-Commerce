import { put, takeEvery } from "redux-saga/effects"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UDPATE_BRAND, UDPATE_BRAND_RED } from "../Constant"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    // let response = yield createRecord("brand", action.payload)               //used this line in case when no file field is used
    let response = yield createMultipartRecord("brand", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_BRAND_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("brand")
    yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    // yield updateRecord("brand", action.payload)                           //used this line in case when no file field is used
    // yield put({ type: UDPATE_BRAND_RED, payload: action.payload })

    let response = yield updateMultipartRecord("brand", action.payload)   //used this line in case when file field is used
    yield put({ type: UDPATE_BRAND_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("brand", action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* BrandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)                                //Watcher Saga
    yield takeEvery(GET_BRAND, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_BRAND, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_BRAND, deleteSaga)                                //Watcher Saga
}