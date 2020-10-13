
import * as consts from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(consts.API_TOKEN_REQUEST, workerSaga)
}

// function that makes the api request and returns a Promise for response



// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga(request) {

  try {
    const config = {
      method: 'post',
      url: `${consts.WORKLIST_API}/token`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : {
        "username": request.config.username,
        "password": request.config.password,
      }
    };
  
    const response = yield call(axios, config);
    const data = response.data;


    // dispatch a success action to the store with the new dog
    yield put({ type: consts.API_TOKEN_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: consts.API_TOKEN_FAILURE, error });
  }
}
