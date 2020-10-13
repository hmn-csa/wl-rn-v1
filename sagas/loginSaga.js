
import * as consts from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(consts.API_TOKEN_REQUEST, workerSaga)
}

// function that makes the api request and returns a Promise for response
function fetchUser(config) {
  return axios(config);
}


export const fetchUserConfig = () => ({ type: "API_TOKEN_CONFIG", config });

// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga() {
  
  const config = {
    method: 'post',
    url: `${consts.WORKLIST_API}/token`,
    data : {
      'username': 'be_min', 
      'password': '1',
    }
  };

  try {
    //const response = yield call(fetchUser);

    //const config = yield take("API_TOKEN_CONFIG")
    console.log(`day nay: ${config.data}`)

    const response = yield call(fetchUser, config);
    const data = response.data;
    console.log(data)

    // dispatch a success action to the store with the new dog
    yield put({ type: consts.API_TOKEN_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: consts.API_TOKEN_FAILURE, error });
  }
}
