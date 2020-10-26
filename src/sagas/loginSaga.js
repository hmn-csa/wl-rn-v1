
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(constAction.API_TOKEN_REQUEST, workerGetToken);
}

// function that makes the api request and returns a Promise for response



// worker saga: makes the api call when watcher saga sees the action
export function* workerGetToken(request) {
  try {
    const config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/token`,
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

    yield put({ type: constAction.API_TOKEN_SUCCESS, content: data });

    // get appls data
    yield call(workerGetData, data.access);

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_TOKEN_FAILURE, error });
  }
}


export function* workerGetData(token) {
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/portfolio-list/`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    }
    
    const response = yield call(axios, config);
    const data = response.data;
    
    // dispatch a success action to the store with the new content
    yield put({ type: constAction.API_DATA_SUCCESS, content: response.data });

    // dispatch INIT_DASHBOARD
    //yield put({ type: constAction.INIT_DASHBOARD, content: data });
    yield put({ type: constAction.DATA_INIT_DASHBOARD });

    // dispatch UPDATE_SHOWLIST
    const allAppls =  Object.values(data).map(appl => appl.appl_id)
    yield put({ type: constAction.UPDATE_SHOWLIST, content: allAppls});

    

  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_DATA_FAILURE, error });
  }
}


