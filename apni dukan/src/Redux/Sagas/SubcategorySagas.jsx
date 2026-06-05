import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UDPATE_SUBCATEGORY, UDPATE_SUBCATEGORY_RED } from "../Constant"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    // let response = yield createRecord("subcategory", action.payload)               //used this line in case when no file field is used
    let response = yield createMultipartRecord("subcategory", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    // yield updateRecord("subcategory", action.payload)                           //used this line in case when no file field is used
    // yield put({ type: UDPATE_SUBCATEGORY_RED, payload: action.payload })

    let response = yield updateMultipartRecord("subcategory", action.payload)   //used this line in case when file field is used
    yield put({ type: UDPATE_SUBCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("subcategory", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* SubcategorySagas() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)                                //Watcher Saga
    yield takeEvery(GET_SUBCATEGORY, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_SUBCATEGORY, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)                                //Watcher Saga
}