import { put, takeEvery } from "redux-saga/effects"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UDPATE_MAINCATEGORY, UDPATE_MAINCATEGORY_RED } from "../Constant"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


function* createSaga(action) {                                                      //worker saga
    // let response = yield createRecord("maincategory", action.payload)               //used this line in case when no file field is used
    let response = yield createMultipartRecord("maincategory", action.payload)   //used this line in case when file field is used
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}

function* getSaga() {                                                               //worker saga
    let response = yield getRecord("maincategory")
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                      //worker saga
    // yield updateRecord("maincategory", action.payload)                           //used this line in case when no file field is used
    // yield put({ type: UDPATE_MAINCATEGORY_RED, payload: action.payload })

    let response = yield updateMultipartRecord("maincategory", action.payload)   //used this line in case when file field is used
    yield put({ type: UDPATE_MAINCATEGORY_RED, payload: response })
}

function* deleteSaga(action) {                                                      //worker saga
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)                                //Watcher Saga
    yield takeEvery(GET_MAINCATEGORY, getSaga)                                      //Watcher Saga
    yield takeEvery(UDPATE_MAINCATEGORY, updateSaga)                                //Watcher Saga
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)                                //Watcher Saga
}