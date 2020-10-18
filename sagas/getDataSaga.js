
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherDataSaga() {
  yield takeLatest(constAction.API_DATA_REQUEST, workerGetData);
}


export function* workerGetData(request) {
  try {
    let config = {
      method: 'post',
      url: `${WORKLIST_API}/appls-list/`,
      headers: { 
        'Authorization': `Bearer ${request.token}`
      }
    }
    const response = yield call(axios, config);
    const data = response.data;
    console.log('getdata')
    // dispatch a success action to the store with the new dog
    yield put({ type: constAction.API_DATA_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_DATA_FAILURE, error });
  }
}
