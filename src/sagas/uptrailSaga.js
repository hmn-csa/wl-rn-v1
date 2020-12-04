
import * as constAction from '../consts'
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaUptrail() {
  yield takeLatest(constAction.API_UPTRAIL_REQUEST, workerGetUptrail);
  yield takeLatest(constAction.USER_UPTRAIL_REQUEST, workerUserUptrail);
}

// function that makes the api request and returns a Promise for response


// worker saga: makes the api call when watcher saga sees the action
export function* workerGetUptrail(request) {
  try {
    const config = {
      method: 'get',
      url: `${constAction.WORKLIST_API}/uptrail`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${request.config.token}`
      },  
      data : {}
    };

    const response = yield call(axios, config);
    const data = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: constAction.API_UPTRAIL_SUCCESS, content: data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_UPTRAIL_FAILURE, error });
  }
}


export function* workerUserUptrail(request) {
  try {
    
    let dataContent =  {
      'appl_id': request.config.appl_id,
      'code': request.config.code,
      'trust_address': request.config.trust_address,
      'type_address': request.config.type_address,
      'remark': request.config.remark,
      'payamount': request.config.payamount,
      'next_visit_time': request.config.next_visit_time,
      'lat': request.config.lat,
      'lon': request.config.lon,
      'image1': request.config.image1,
      'image2': request.config.image2,
      'image3': request.config.image3,
    }
    
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/uptrail`,
      headers: {
        'Authorization': `Bearer ${request.config.token_value}`
      },
      data: dataContent
    }
    
    const response = yield call(axios, config);
    const timedata = response.data.message;
    // dispatch a success action to the store with the new content
    dataContent = {...dataContent, 'runtime' :timedata}
    yield put({ type: constAction.USER_UPTRAIL_SUCCESS, content: dataContent});

    // dispatch CAL-DASH
  


  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.USER_UPTRAIL_FAILURE, error });
  }
}


